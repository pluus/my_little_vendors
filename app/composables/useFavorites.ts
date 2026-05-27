export function useFavorites() {
  const { loggedIn } = useUserSession();
  const favoriteIds = useState<number[]>("favorites", () => []);
  const pending = ref(false);

  async function fetchFavorites() {
    if (!loggedIn.value) {
      favoriteIds.value = [];
      return;
    }
    const data = await $fetch<number[]>("/api/favorites").catch(() => []);
    favoriteIds.value = data;
  }

  function isFavorite(id: number) {
    return favoriteIds.value.includes(id);
  }

  async function toggleFavorite(id: number) {
    if (!loggedIn.value) {
      await navigateTo("/login");
      return;
    }

    if (pending.value) return;
    pending.value = true;
    const wasFav = isFavorite(id);

    // Optimistic update
    favoriteIds.value = wasFav
      ? favoriteIds.value.filter((f) => f !== id)
      : [...favoriteIds.value, id];

    try {
      if (wasFav) {
        await $fetch(`/api/favorites/${id}`, { method: "DELETE" });
      } else {
        await $fetch("/api/favorites", {
          method: "POST",
          body: { businessId: id },
        });
      }
    } catch {
      // Rollback on error
      favoriteIds.value = wasFav
        ? [...favoriteIds.value, id]
        : favoriteIds.value.filter((f) => f !== id);
    } finally {
      pending.value = false;
    }
  }

  return { favoriteIds, isFavorite, toggleFavorite, fetchFavorites, pending };
}
