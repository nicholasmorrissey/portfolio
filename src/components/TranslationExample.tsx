import styles from "../styles/TranslationExample.module.scss";
import * as React from "react";
import { translationExamplePresets } from "../utils/translationExamplePresets";

interface TranslationExampleProps {
  langIndex?: number;
  isInput?: boolean;
}

const TranslationExample: React.FC<TranslationExampleProps> = ({
  langIndex = 0,
  isInput = false,
}) => {
  const [currentPresetIndex, setCurrentPresetIndex] = React.useState(langIndex);
  const [opacity, setOpacity] = React.useState(1);

  const presets = translationExamplePresets;

  React.useEffect(() => {
    if (isInput) {
      const interval = setInterval(() => {
        setOpacity(0);
        setTimeout(() => {
          setCurrentPresetIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= presets.length ? 1 : nextIndex;
          });
          setOpacity(1);
        }, 500);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInput, presets.length]);

  const preset = presets[currentPresetIndex] || presets[0];

  if (!preset) return <></>;

  return (
    <div
      className={styles.translationContainer}
      style={{
        fontSize: preset.fontSize,
        opacity: isInput ? 0.7 : 1,
      }}
    >
      <div
        className={styles.translationContent}
        style={{
          opacity: isInput ? opacity * 0.7 : 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <h1>{preset.title}</h1>
        <p>{preset.description}</p>
        <ul>
          {preset.listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{preset.conclusion}</p>
        <div>
          <div className={styles.translationCardContainer}>
            <div
              className={styles.translationCard}
              style={{
                backgroundColor: "var(--color-error-bg)",
                border: "1px solid var(--color-error)",
              }}
            >
              <span style={{ color: "var(--color-error)", fontWeight: "bold" }}>
                {preset.beforeStats.title}
              </span>
              {preset.beforeStats.items.map((item, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </div>
            <div
              className={styles.translationCard}
              style={{
                backgroundColor: "var(--color-success-bg)",
                border: "1px solid var(--color-success)",
              }}
            >
              <span
                style={{ color: "var(--color-success)", fontWeight: "bold" }}
              >
                {preset.afterStats.title}
              </span>
              {preset.afterStats.items.map((item, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </div>
          </div>
        </div>
        <p>{preset.finalParagraph}</p>
      </div>
    </div>
  );
};

export default TranslationExample;
