"use client";
import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { CopyButton } from "@/source/assets/toggle";
import { markdownText } from "./markdown-text";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";

export function MarkdownText() {
  const [text, setText] = useState<string>(sample);

  const edit = (
    <>
      <Textarea name="playground" data-rehype-pretty-code-fragment="" id="playground" title="playground" aria-label="playground" cols={30} rows={10} className="relative !border-0 !bg-transparent scrollbar" spellCheck={false} value={text} onChange={e => setText(e.currentTarget.value)} />
      <CopyButton className="absolute right-4 top-4 z-9" value={text} />
    </>
  );

  const preview = <div data-rehype-pretty-code-fragment="" className="textarea_class markdown-body relative flex-col whitespace-pre-line !border-0 !bg-transparent scrollbar" dangerouslySetInnerHTML={{ __html: markdownText(text) }} />;

  return (
    <Tabs defaultValue="preview" id="preview" className="mb-auto size-full scroll-m-20">
      <PlayTabs defaultValue="preview" childrens={{ edit, preview }} />
    </Tabs>
  );
}

const sample = `
# 💫 About Me:
- 🔭 I’m currently working on several projects, including a primitive UI that I built.<br>
- 👨‍💻 I’m a dedicated Web App Developer with a strong expertise in React.js and Next.js.<br>
- 🌱 I'm currently learning python, java, etc.<br>
- 🤔 I’m looking for help to develop the primitive UI for more flexibility.<br>
- 🙏 I’d love to collaborate on any project I'm good at.<br>
- 📦 Find the package module at [![npmjs.com/~khoeriilham](https://img.shields.io/badge/khoeriilham-white?logo=npm&logoColor=red)](https://www.npmjs.com/~khoeriilham) <br>
- 🗃️ Read the documentation board at [![ioeri.vercel.app](https://img.shields.io/badge/oeri-white.svg?logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0ibTMuOTcsMTEuOTRzLS4wOSwwLS4xMywwYy0uNTUtLjA3LS45My0uNTctLjg2LTEuMTIuMjgtMi4xNywxLjM1LTQuMTcsMy01LjYzLDEuNjYtMS40NywzLjgtMi4yOCw2LjAzLTIuMjgsMi4wMiwwLDMuOTQuNjUsNS41NCwxLjg4LjQ0LjM0LjUyLjk2LjE4LDEuNC0uMzQuNDQtLjk2LjUyLTEuNC4xOC0xLjI1LS45Ni0yLjc0LTEuNDctNC4zMi0xLjQ3LTMuNTUsMC02LjU4LDIuNjUtNy4wNCw2LjE3LS4wNy41LS41Ljg3LS45OS44N1oiLz48cGF0aCBkPSJtMTIsMjEuMWMtMi4wMiwwLTMuOTQtLjY1LTUuNTQtMS44OC0uNDQtLjM0LS41Mi0uOTYtLjE4LTEuNC4zNC0uNDQuOTYtLjUyLDEuNC0uMTgsMS4yNS45NiwyLjc0LDEuNDcsNC4zMiwxLjQ3LDMuNTUsMCw2LjU4LTIuNjUsNy4wNC02LjE3LjA3LS41NS41Ny0uOTMsMS4xMi0uODYuNTUuMDcuOTMuNTcuODYsMS4xMi0uMjgsMi4xNy0xLjM1LDQuMTctMyw1LjYzLTEuNjYsMS40Ny0zLjgsMi4yOC02LjAzLDIuMjhaIi8+PHBhdGggZD0ibTEuNDksMTguOThjLS4zOSwwLS43Ni0uMjMtLjkyLS42Mi0uMjEtLjUxLjAzLTEuMS41NC0xLjMxbDE0Ljk3LTYuMmMuNTEtLjIxLDEuMS4wMywxLjMxLjU0LjIxLjUxLS4wMywxLjEtLjU0LDEuMzFMMS44NywxOC45Yy0uMTMuMDUtLjI1LjA4LS4zOC4wOFoiLz48cGF0aCBkPSJtNy41NSwxMy4yMmMtLjM5LDAtLjc2LS4yMy0uOTItLjYyLS4yMS0uNTEuMDMtMS4xLjU0LTEuMzFsMTQuOTctNi4yYy41MS0uMjEsMS4xLjAzLDEuMzEuNTQuMjEuNTEtLjAzLDEuMS0uNTQsMS4zMWwtMTQuOTcsNi4yYy0uMTMuMDUtLjI1LjA4LS4zOC4wOFoiLz48L3N2Zz4=)](https://ioeri.vercel.app) <br>
- 💬 Come join the team on the discord channel.<br>
- ⚡ Strong utility and UI scalability.

## 🌐 Socials:

[![Codepen](https://img.shields.io/badge/Codepen-12100E?logo=codepen&logoColor=white)](https://codepen.io/ilkhoeri) [![Medium](https://img.shields.io/badge/Medium-12100E?logo=medium&logoColor=white)](https://ilkhoeri.medium.com) [![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/Xct5BBPDZ9) [![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/ilkhoeri) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/ilkhoeri) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/ilkhoeri) [![Quora](https://img.shields.io/badge/Quora-%23B92B27.svg?logo=Quora&logoColor=white)](https://quora.com/profile/Il-8-1) [![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/21085280/ilkhoeri) [![Twitch](https://img.shields.io/badge/Twitch-%239146FF.svg?logo=Twitch&logoColor=white)](https://twitch.tv/ilkhoeri) [![YouTube](https://img.shields.io/badge/-%23FF0000.svg?logo=YouTube&logoColor=white)](https://www.youtube.com/@il6336) [![X](https://img.shields.io/badge/-12100E.svg?logo=X&logoColor=white)](https://x.com/ilkhoeri) [![TikTok](https://img.shields.io/badge/-12100E.svg?logo=TikTok&logoColor=white)](https://tiktok.com/@ilkhoeri)

## 💻 Tech Stack:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white) ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Gatsby](https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white) ![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white) ![Meteor JS](https://img.shields.io/badge/meteorjs-%23d74c4c.svg?style=for-the-badge&logo=meteor&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Three js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Chart.js](https://img.shields.io/badge/chartjs-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white) ![WordPress](https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white) ![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![Mantine](https://img.shields.io/badge/mantine-%23339af0.svg?style=for-the-badge&logo=mantine&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white) ![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

## 📊 GitHub Stats:
[![](https://github-readme-stats.vercel.app/api/top-langs/?username=ilkhoeri&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact&hide=html)](https://github.com/ilkhoeri)<br/>
[![](https://github-readme-stats.vercel.app/api?username=ilkhoeri&theme=dark&hide_border=false&include_all_commits=false&count_private=true&show_icons=true)](https://github.com/ilkhoeri)
[![](https://github-readme-streak-stats.herokuapp.com/?user=ilkhoeri&theme=dark&hide_border=false&include_all_commits=true&count_private=true&show_icons=true)](https://github.com/ilkhoeri)

### 🔝 Top Contributed Repo
[![](https://github-contributor-stats.vercel.app/api?username=ilkhoeri&hide_contributor_rank=false&theme=dark&combine_all_yearly_contributions=true&order_by=contributions)](https://github.com/ilkhoeri)

---
[![](https://visitcount.itsvg.in/api?id=ilkhoeri&icon=6&color=12)](https://visitcount.itsvg.in)

<hr/>
___

<div align="center">
  <a href="https://www.github.com/ilkhoeri/modules" target="_blank">
    <img src="https://raw.githubusercontent.com/ioeridev/.github/main/profile/ioeri-512x512.png" alt="ioeri" height="200" style="width: 200px;height: 200px;border-radius: 8px;overflow: hidden;" />
  </a>
</div>
___

# Title h1

## Title h2

### Title h3

1 ordered...
2 ordered...

- unordered list 1
- unordered list 2

> blockquote

<div align="center">
  [Link](https://oeri.vercel.app)
  <address@mail.com>
</div>

\`\`\`\
function stripHtml(text: string) {
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return text.trim();
}
\`\`\`\

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri">
    <img src="https://badgen.net/npm/v/ioeri" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri">
    <img src="https://badgen.now.sh/npm/dm/ioeri" alt="downloads" />
  </a>
</div>
`;
