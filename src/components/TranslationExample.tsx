import styles from "../styles/TranslationExample.module.scss";

interface TranslationExampleProps {
  langIndex?: number;
  isInput?: boolean;
}

const TranslationExample: React.FC<TranslationExampleProps> = ({
  langIndex = 0,
  isInput = false,
}) => {
  const presets = [
    {
      fontSize: "16px",
      title: "Rich AI Translation Tools",
      description:
        "I identified gaps in analyst workflows when trying to translate mixed media content, and developed a tool that translated text in place while preserving:",
      listItems: [
        "Tables",
        "Images",
        "Lists",
        "Formatting",
        "Links",
        "And more",
      ],
      conclusion:
        "It was quickly adopted agency wide and highly praised by users for its impact, particularly due to its speed and ease of use.",
      beforeStats: {
        title: "Before",
        items: [
          "8-12 seconds per table <b>cell</b>",
          "slow to reformat results",
          "outdated open source models",
          "impossible to scan large content",
        ],
      },
      afterStats: {
        title: "After",
        items: [
          "3 seconds per <b>table</b>",
          "results formatted instantly",
          "latest in-house models",
          "content can be scanned in orignal formatting",
        ],
      },
      finalParagraph:
        "This tool inspired the creation of the more comprehensive document editing platform mentioned above, but remains as the standalone core component of the system, and is integral to the workflow of hundreds of daily users.",
    },
    {
      fontSize: "13px",
      title: "高度なAI翻訳ツールの開発",
      description:
        "私は混合メディアコンテンツを翻訳する際のアナリストワークフローのギャップを積極的に特定し、その場でテキストを翻訳しながら以下を保持するツールを独自に開発しました：",
      listItems: [
        "テーブル",
        "画像",
        "リスト",
        "フォーマット",
        "リンク",
        "その他",
      ],
      conclusion:
        "このツールは機関全体で迅速に採用され、その速度と使いやすさによる影響力でユーザーから高く評価されました。",
      beforeStats: {
        title: "以前",
        items: [
          "テーブル<b>セル</b>あたり8-12秒",
          "結果の再フォーマットが遅い",
          "古いオープンソースモデル",
          "大きなコンテンツのスキャンが不可能",
        ],
      },
      afterStats: {
        title: "以後",
        items: [
          "<b>テーブル</b>あたり3秒",
          "結果が即座にフォーマット",
          "最新の社内モデル",
          "元のフォーマットでコンテンツをスキャン可能",
        ],
      },
      finalParagraph:
        "このツールが上述のより包括的なドキュメント編集プラットフォームの創設にインスピレーションを与えましたが、システムの独立したコア要素として残っており、何百人もの日常ユーザーのワークフローに不可欠です。",
    },
  ];

  const preset = presets[langIndex] || presets[0];

  if (!preset) return <></>;

  return (
    <div
      className={styles.translationContainer}
      style={{ opacity: isInput ? 0.7 : 1, fontSize: preset.fontSize }}
    >
      <div className={styles.translationContent}>
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
