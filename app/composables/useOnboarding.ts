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
      // Store timestamp when onboarding was shown
      localStorage.setItem("onboarding-last-shown", Date.now().toString());
    }
  };

  const skipOnboarding = () => {
    hasCompletedOnboarding.value = true;
    selectedCategories.value = [];

    if (import.meta.client) {
      localStorage.setItem("onboarding-completed", "true");
      localStorage.setItem("onboarding-categories", JSON.stringify([]));
      // Store timestamp when onboarding was shown
      localStorage.setItem("onboarding-last-shown", Date.now().toString());
    }
  };

  const shouldShowOnboarding = (): boolean => {
    if (!import.meta.client) return false;

    const lastShown = localStorage.getItem("onboarding-last-shown");
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // If never shown, or more than 24 hours have passed
    if (!lastShown || now - parseInt(lastShown) > oneDayInMs) {
      // 25% chance
      return Math.random() <= 0.25;
    }

    return false;
  };

  const markOnboardingShown = () => {
    if (import.meta.client) {
      localStorage.setItem("onboarding-last-shown", Date.now().toString());
    }
  };

  return {
    hasCompletedOnboarding,
    selectedCategories,
    completeOnboarding,
    skipOnboarding,
    shouldShowOnboarding,
    markOnboardingShown,
  };
};
