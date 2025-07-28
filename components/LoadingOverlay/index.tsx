export function LoadingOverlay() {
  return (
    <div
      className="
        fixed inset-0
        backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
      style={{ WebkitBackdropFilter: "blur(6px)" }}
    >
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
