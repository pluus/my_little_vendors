export const useOnboarding = () => {
  const hasCompletedOnboarding = useState<boolean>(
    "onboarding-completed",
    () => {
      if (import.meta.client) {
        return localStorage.getItem("onboarding-completed") === "true";
      }
      return false;
    },
  );

  const selectedCategories = useState<string[]>("onboarding-categories", () => {
    if (import.meta.client) {
      const stored = localStorage.getItem("onboarding-categories");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const completeOnboarding = (categories: string[]) => {
    selectedCategories.value = categories;
    hasCompletedOnboarding.value = true;

    if (import.meta.client) {
      localStorage.setItem("onboarding-completed", "true");
      localStorage.setItem("onboarding-categories", JSON.stringify(categories));
    }
  };

  const skipOnboarding = () => {
    hasCompletedOnboarding.value = true;
    selectedCategories.value = [];

    if (import.meta.client) {
      localStorage.setItem("onboarding-completed", "true");
      localStorage.setItem("onboarding-categories", JSON.stringify([]));
    }
  };

  return {
    hasCompletedOnboarding,
    selectedCategories,
    completeOnboarding,
    skipOnboarding,
  };
};
