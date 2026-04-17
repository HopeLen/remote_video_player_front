function NamePicker({ onChange }: { onChange: (val: string) => void }) {
  return (
    <>
      <div className="border border-violet-600 rounded-2xl p-4 flex flex-col gap-5 w-full">
        <h2>Choose a name:</h2>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
    </>
  );
}

export default NamePicker;
