import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import {
  ArrowRightToLine,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import * as React from "react";
import styles from "../styles/Hero.module.scss";
import StateLoaderPlugin from "./StateLoaderPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import TranslationExample from "./TranslationExample";
import TreeViewPlugin from "./TreeViewPlugin";

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [pageInitialized, setPageInitialized] = React.useState(false);

  const [isTranslationSectionVisible, setIsTranslationSectionVisible] =
    React.useState(false);
  const translationSectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTranslationSectionVisible(true);
          console.log("Translation section is visible");
        }
      },
      { threshold: 0.1 }
    );

    if (translationSectionRef.current) {
      observer.observe(translationSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [isTechSectionVisible, setIsTechSectionVisible] = React.useState(false);
  const techSectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTechSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (techSectionRef.current) {
      observer.observe(techSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
    setPageInitialized(true);
  }, []);

  const nodeList = [
    HeadingNode,
    ParagraphNode,
    TextNode,
    ListNode,
    ListItemNode,
    MarkNode,
  ];

  const initialConfig = {
    namespace: "MyEditor",
    theme: {},
    nodes: nodeList,
    initialEditorState: null,
    onError: (error: Error) => console.error(error),
  };

  const getExperienceString = () => {
    const startDate = new Date(2018, 4);
    const currentDate = new Date();

    const years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();

    const totalMonths = years * 12 + months;
    const experienceYears = Math.floor(totalMonths / 12);
    const experienceMonths = Math.ceil(totalMonths % 12);

    return `${experienceYears} years, ${experienceMonths} months`;
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div
          className={styles.headerContainer}
          style={{ fontSize: isMobile ? "14px" : "16px" }}
        >
          <div className={styles.nameContainer}>
            <img
              src="/profile.png"
              alt="Nick Morrissey"
              className={styles.profileImage}
            />
            <div className={styles.nameTextContainer}>
              <h2 className={styles.title}>Nick Morrissey</h2>
              <h3 className={styles.subtitle}>Frontend Developer</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MapPin
                  fill="#770000"
                  style={{
                    color: "red",
                    marginRight: "6px",
                    fontSize: "1.5em",
                  }}
                />
                <h4
                  style={{
                    color: "white",
                    fontSize: isMobile ? "0.8em" : "1em",
                  }}
                >
                  Canberra, Australia
                </h4>
                <h4
                  style={{
                    color: "white",
                    marginLeft: "12px",
                    fontSize: isMobile ? "0.8em" : "1em",
                  }}
                >
                  <b
                    style={{
                      color: "var(--color-primary)",
                      marginRight: "8px",
                    }}
                  >
                    EXP
                  </b>
                  {getExperienceString()}
                </h4>
              </div>
            </div>
            {!isMobile && (
              <div className={styles.contactContainer}>
                <a
                  href="https://www.linkedin.com/in/nicholas-morrissey-60b7042aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactField}
                >
                  <span>LinkedIn</span>
                  <Linkedin className={styles.contactIcon} />
                </a>
                <a
                  href="https://github.com/nicholasmorrissey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactField}
                >
                  <span>Github</span>
                  <Github className={styles.contactIcon} />
                </a>
                <a
                  href="mailto:morrissey.nicholas@gmail.com"
                  className={styles.contactField}
                >
                  <span>morrissey.nicholas@gmail.com</span>
                  <Mail className={styles.contactIcon} />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={styles.columnContainer}>
          <LexicalComposer initialConfig={initialConfig}>
            <div
              className={`${styles.documentEditorContainer} ${
                pageInitialized ? styles.slideInVisible : styles.slideInHidden
              }`}
            >
              <div className={styles.documentEditor}>
                <ToolbarPlugin />
                <div
                  style={{
                    flex: 1,
                    padding: "20px",
                    background:
                      "linear-gradient(180deg, #280d55 0%, #15072f 100%)",
                    borderRadius: "0px 0px 20px 20px",
                  }}
                >
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable className={styles.contentEditable} />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <StateLoaderPlugin delay={1} />
                  <HistoryPlugin />
                  <OnChangePlugin onChange={() => {}} />
                </div>
              </div>
              {!isMobile && (
                <div className={styles.treeViewContainer}>
                  <TreeViewPlugin />
                </div>
              )}
            </div>
          </LexicalComposer>
        </div>

        <h3 style={{ marginBottom: "30px" }}>Powered by...</h3>
        <div className={styles.columnContainer}>
          <div
            ref={translationSectionRef}
            className={`${styles.translationEditorContainer} ${
              isTranslationSectionVisible
                ? styles.slideInVisible
                : styles.slideInHidden
            }`}
          >
            {!isMobile && (
              <>
                <TranslationExample langIndex={1} isInput={true} />
                <ArrowRightToLine
                  style={{
                    color: "var(--color-primary)",
                    margin: "12px",
                    alignSelf: "center",
                  }}
                />
              </>
            )}
            <TranslationExample langIndex={0} />
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className={styles.portfolioSection}>
        <div className={styles.columnContainer}>
          <h2 className={styles.sectionHeader}>
            <span className={styles.sectionHeaderText}>Before that...</span>
          </h2>
          <div className={styles.experienceContainer}>
            <div className={styles.experienceItem}>
              <h1 className={styles.jobTitle}>Full-stack Developer</h1>
              <span className={styles.jobDuration}>
                Jan 2021 - Aug 2023 · <b>2 yrs 8 mos</b>
              </span>
              <p className={styles.jobDescription}>
                Developed a modern web task management application built with
                Typescript, React, Java, Go, and Material UI, which supported
                critical organisational functions in a classified and high
                stakes environment. I led the implementation of UI/UX and
                collaborated closely with business analysts, designers, and
                stakeholders to iteratively improve solutions and bridge the gap
                between engineering and design.
              </p>
              <p className={styles.jobDescription}>
                Through greenfield development I planned software architecture,
                built out reusable component libraries, wrote unit tests, and
                maintained a growing code base through releases. I am grateful
                for this role, as it gave me a strong fullstack skillset and
                allowed me to research and implement industry best practices.
              </p>
            </div>

            <div className={styles.experienceItem}>
              <h1 className={styles.jobTitle}>Web Services Developer</h1>
              <span className={styles.jobDuration}>
                Jan 2019 - Jan 2021 · <b>2 yrs 1 mo</b>
              </span>
              <p className={styles.jobDescription}>
                Worked as a fullstack web developer, leading the development and
                deployment of a comprehensive learning management system. I
                collaborated closely with learning and development teams to
                gather requirements, integrate identity systems for seamless
                onboarding, and automate key data imports.
              </p>
              <p className={styles.jobDescription}>
                I also set up and configured web servers and databases,
                developed custom audit tools, maintained deployments across
                development and production instances, and led user interface
                overhauls of legacy applications.
              </p>
            </div>

            <div className={styles.experienceItem}>
              <h1 className={styles.jobTitle}>ICT Cadet</h1>
              <span className={styles.jobDuration}>
                May 2018 - Jan 2019 · <b>9 mos</b>
              </span>
              <p className={styles.jobDescription}>
                While completing my university studies, I worked part-time as an
                ICT Cadet supporting internal software development projects. I
                contributed to user interface design, assisted with requirements
                gathering, and participated in agile team workflows. The role
                provided hands-on experience within a secure government
                environment and included structured training and professional
                development.
              </p>
            </div>
            <div className={styles.experienceItem}>
              <h1 className={styles.jobTitle}>
                Bachelor of Software Engineering
              </h1>
              <span className={styles.jobDuration}>
                Jan 2016 - Jan 2020 · <b>4 yrs</b>
              </span>
              <p className={styles.jobDescription}>
                I completed a Bachelor of Software Engineering at the University
                of Canberra, where I gained a solid foundation in software
                development principles, algorithms, and data structures. My
                studies included hands-on projects that enhanced my coding
                skills and understanding of software design patterns. I did
                minors in Networking, Design, and Web and Game Development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.portfolioSectionDark}>
        <div
          ref={techSectionRef}
          className={`${styles.columnContainer} ${
            isTechSectionVisible ? styles.slideInVisible : styles.slideInHidden
          }`}
        >
          <h2 className={styles.sectionHeader}>
            <span className={styles.sectionHeaderText}>
              Technologies and Languages
            </span>
          </h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div
              className={styles.techCategory}
              style={{ flex: 1, fontSize: "20px" }}
            >
              <h2>Frontend</h2>
              <ul>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Lexical.js</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Websockets</li>
                <li>Redux</li>
                <li>RTK Query</li>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>Sass</li>
                <li>Material UI</li>
                <li>Tailwind</li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "20px",
              }}
            >
              <div
                className={styles.techCategorySecondary}
                style={{
                  flex: 1,
                  backgroundColor: "var(--color-box-secondary)",
                }}
              >
                <h2>Backend & DevOps</h2>
                <ul>
                  <li>Java</li>
                  <li>GoLang</li>
                  <li>MySQL</li>
                  <li>Git</li>
                  <li>Docker</li>
                  <li>Kubernetes</li>
                  <li>AWS</li>
                  <li>Github & GitLab</li>
                  <li>Vercel</li>
                </ul>
              </div>
              <div
                className={styles.techCategorySecondary}
                style={{
                  flex: 1,
                  backgroundColor: "var(--color-box-secondary)",
                }}
              >
                <h2>Testing</h2>
                <ul>
                  <li>Jest</li>
                  <li>React Testing Library</li>
                  <li>Puppeteer</li>
                </ul>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "20px",
              }}
            >
              <div
                className={styles.techCategorySecondary}
                style={{
                  flex: 1,
                  backgroundColor: "var(--color-box-secondary)",
                }}
              >
                <h2>Design</h2>
                <ul>
                  <li>Photoshop</li>
                  <li>Figma</li>
                </ul>
              </div>
              <div
                className={styles.techCategorySecondary}
                style={{
                  flex: 1,
                  backgroundColor: "var(--color-box-secondary)",
                }}
              >
                <h2>Game Dev</h2>
                <ul>
                  <li>C#</li>
                  <li>Unity</li>
                  <li>Blender</li>
                  <li>Cascaduer </li>
                </ul>
              </div>
              <div
                className={styles.techCategorySecondary}
                style={{
                  flex: 1,
                  backgroundColor: "var(--color-box-secondary)",
                }}
              >
                <h2>Other</h2>
                <ul>
                  <li>Linux</li>
                  <li>Adobe Premiere</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.portfolioSection}>
        <div className={styles.columnContainer}>
          <h2 className={styles.sectionHeader}>
            <span className={styles.sectionHeaderText}>Personal Projects</span>
          </h2>
          <div className={styles.personalProjectContainer}>
            <div className={styles.projectHeader}>
              <h1>When Games? (2024)</h1>
              <span className={styles.projectStatusOnline}>Online</span>
            </div>
            <div className={styles.projectLinks}>
              <a
                href="https://whengames.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://whengames.vercel.app/
              </a>
            </div>
            <p className={styles.subtleText}>
              Daily game to sort 10 random video games by their release date.
              Compare game screenshots and use clues to guess the correct order.
              Inspired by my love for daily games like Wordle, Connections,
              Gamedle, and others.
            </p>
            <img
              src="/when-games-screenshot.png"
              alt="When Games project"
              className={styles.projectImage}
            />
          </div>
          <div className={styles.personalProjectContainer}>
            <div className={styles.projectHeader}>
              <h1>Savvy (2023)</h1>
              <span className={styles.projectStatusDiscontinued}>Offline</span>
            </div>
            <p className={styles.subtleText}>
              A marketplace tool for discovering rare and undervalued Counter
              Strike 2 weapon skins.
            </p>
            <img
              src="/savvy-screenshot.png"
              alt="Savvy project"
              className={styles.projectImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.portfolioSectionDark}>
        <div className={styles.columnContainer}>
          <h2 className={styles.sectionHeader}>
            <span className={styles.sectionHeaderText}>Game Development</span>
          </h2>
          <div className={styles.gameProjectContainer}>
            <span className={styles.subtleText}>
              In my free time, I work on game development projects using Unity
              and C#. I'm passionate about video games and game design, and
              developing them is a rewarding application of my professional
              skills.
            </span>
            <span className={styles.subtleText}>
              Game development has many similarities to fullstack web
              development, you often have to wear many different hats and be
              able to piece it all together. It has given me valuable experience
              in building complex systems while maintaining performance and
              upholding good visual design principles.
            </span>
            <video className={styles.gameVideo} autoPlay loop muted playsInline>
              <source src="/gameDemo.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      <div className={styles.portfolioSection}>
        <div className={styles.columnContainer}>
          <div className={styles.signOffContainer}>
            <h2
              className={styles.sectionHeader}
              style={{ marginBottom: "6px" }}
            >
              <span className={styles.sectionHeaderText}>
                Thanks for visiting!
              </span>
            </h2>
            <span className={styles.subtleText}>
              Feel free to reach out via LinkedIn or email.
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "12px",
                color: "var(--color-primary)",
              }}
            >
              <a
                href="https://www.linkedin.com/in/nicholas-morrissey-60b7042aa/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.signOffContact}
              >
                <Linkedin className={styles.contactIcon} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:morrissey.nicholas@gmail.com"
                className={styles.signOffContact}
              >
                <Mail className={styles.contactIcon} />
                <span>morrissey.nicholas@gmail.com</span>
              </a>
            </div>
            <div onClick={scrollToTop} className={styles.backToTopButton}>
              <ArrowUp className={styles.contactIcon} />
              <span>Back to top</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
