export default function LegalText({ text }) {
  // Zeilenenden normalisieren (Windows \r\n → \n) und sicherstellen, dass
  // Zwischenüberschriften („## “) auch ohne Leerzeile davor als eigene Blöcke erkannt werden.
  const normalized = text.replace(/\r\n?/g, "\n").replace(/\n(?=## )/g, "\n\n");
  const blocks = normalized.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="mt-16 space-y-6 text-sm leading-relaxed text-precision/75">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const first = lines[0];
        if (first.startsWith("## ")) {
          const rest = lines.slice(1).join("\n").trim();
          return (
            <div key={i}>
              <h2 className="pt-8 text-xs font-medium uppercase tracking-[0.25em] text-aqua-deep">
                {first.slice(3)}
              </h2>
              {rest && <p className="mt-4 whitespace-pre-line">{rest}</p>}
            </div>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}
