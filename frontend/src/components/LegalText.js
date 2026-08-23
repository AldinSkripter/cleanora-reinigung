export default function LegalText({ text }) {
  const blocks = text.split(/\n{2,}/).filter(Boolean);
  return (
    <div className="mt-16 space-y-6 text-sm leading-relaxed text-precision/75">
      {blocks.map((block, i) =>
        block.startsWith("## ") ? (
          <h2 key={i} className="pt-8 text-xs font-medium uppercase tracking-[0.25em] text-precision/50">
            {block.slice(3)}
          </h2>
        ) : (
          <p key={i} className="whitespace-pre-line">{block}</p>
        ),
      )}
    </div>
  );
}
