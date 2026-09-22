export interface AdminToastMessage {
  text: string;
  type: "success" | "error";
}

export function useAdminToast() {
  const message = useState<AdminToastMessage | null>("admin-toast", () => null);

  function show(text: string, type: AdminToastMessage["type"] = "success") {
    message.value = { text, type };
    setTimeout(() => {
      if (message.value?.text === text) message.value = null;
    }, 3000);
  }

  return { message, show };
}
