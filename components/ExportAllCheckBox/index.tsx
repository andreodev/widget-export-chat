interface ExportAllCheckboxProps {
  allChats: boolean;
  setAllChats: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ExportAllCheckbox({
  allChats,
  setAllChats,
}: ExportAllCheckboxProps) {
  return (
    <div className="flex items-center gap-3  rounded-lg ">
      <input
        id="check-all"
        type="checkbox"
        checked={allChats}
        onChange={(e) => setAllChats(e.target.checked)}
        className="h-4 w-4 text-[#192D3E] cursor-pointer border-gray-300 rounded focus:ring-[#192D3E]"
      />
      <label htmlFor="check-all" className="text-sm text-gray-700">
        Exportar histórico completo deste contato
      </label>
    </div>
  );
}
