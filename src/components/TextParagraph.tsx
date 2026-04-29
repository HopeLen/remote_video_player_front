function TextParagraph({ text }: { text: string }) {
  return (
    <>
      <p className=" border border-violet-600 rounded-2xl p-3 text-white">
        {text}
        </p>
    </>
  );
}

export default TextParagraph;
