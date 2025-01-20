import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Prose, ProseProps } from "@/ui/prose";

const codes = {
  usage:
    'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h1>🌊🏴‍☠️</h1>\n  <h1>The Great Pirate Era</h1>\n  <h2>Gol D. Roger\'s Final Words</h2>\n  <h3>A Legacy of Adventure</h3>\n  <h4>The Straw Hat Pirates</h4>\n\n  <h5>What Makes Luffy <a href="">Unstoppable</a>?</h5>\n\n  <p>\n    It all began with <a href="">Gol D. Roger</a>, the Pirate King, whose final words set the seas ablaze with ambition: "My treasure? It\'s yours if you want\n    it. I left everything I gathered in one place. Now you just have to find it!" This declaration created the Great Pirate Era, where countless adventurers set\n    sail to find the legendary <strong>One Piece</strong>.\n  </p>\n\n  <p>\n    Among them is Monkey D. Luffy, a boy with a dream to become the next Pirate King. With his trusty straw hat, gifted by the legendary Shanks, and the power\n    of the <code>Gomu Gomu no Mi</code>, Luffy is destined to change the world. Alongside his diverse and loyal crew, they face challenges, explore mysterious\n    islands, and uncover secrets of the world’s history.\n  </p>\n\n  <hr />\n\n  <p>\n    The journey isn’t easy. Each step requires bravery, camaraderie, and perseverance. From battling the ruthless <strong>Warlords of the Sea</strong> to\n    confronting the secrets of the <em>Void Century</em>, the Straw Hat Pirates remain undeterred. Here’s a glimpse of their remarkable story:\n  </p>\n`;\n\nexport function ProseDemo() {\n  return <Prose __html={content} />;\n}',
  blockquote:
    'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h3>Quotes</h3>\n  <blockquote>"If you don’t take risks, you can’t create a future." - Monkey D. Luffy</blockquote>\n  <p>And it can span into multiple lines:</p>\n  <blockquote>\n    "Inherited will, the swelling of the changing times, and the dreams of people, these are things that cannot be stopped. As long as people continue to seek\n    the meaning of freedom, these things will never cease to be!" - Gol D. Roger\n  </blockquote>\n  <li>\n    <ul>\n      <li>list 1</li>\n      <li>list 2</li>\n      <li>list 3</li>\n    </ul>\n  </li>\n  <p>\n    There&apos;s also <strong>strong</strong>, <b>courage</b>, and <em>determination</em> in their journey! But, let&apos;s display some\n    <code>challenges!</code>\n  </p>\n`;\n\nexport function ProseBlockquoteDemo() {\n  return <Prose __html={content} />;\n}',
  list: 'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h3>Mugiwara Crew</h3>\n  <p>The core members of the Straw Hat Pirates:</p>\n  <ul>\n    <li>Monkey D. Luffy - The Captain</li>\n    <li>Roronoa Zoro - The Swordsman</li>\n    <li>Nami - The Navigator</li>\n    <li>Usopp - The Sniper</li>\n    <li>Sanji - The Cook</li>\n    <li>Tony Tony Chopper - The Doctor</li>\n    <li>Nico Robin - The Archaeologist</li>\n    <li>Franky - The Shipwright</li>\n    <li>Brook - The Musician</li>\n    <li>Jinbe - The Helmsman</li>\n  </ul>\n  <p>Their ultimate goals:</p>\n  <ol>\n    <li>Find the legendary One Piece.</li>\n    <li>\n      Overcome these sub-challenges:\n      <ol>\n        <li>Gathering enough supplies for the journey.</li>\n        <li>Recruiting allies to their cause.</li>\n        <li>Surviving the harshest seas in the world.</li>\n      </ol>\n    </li>\n    <li>Unravel the mysteries of the Void Century.</li>\n    <li>\n      Face incredible challenges to achieve this:\n      <ol>\n        <li>Decipher the Poneglyphs.</li>\n        <li>Confront the guardians of the ancient secrets.</li>\n        <li>Protect Robin, the only one capable of reading the ancient language.</li>\n      </ol>\n    </li>\n    <li>Overthrow the oppressive World Government.</li>\n    <li>\n      This requires:\n      <ol>\n        <li>Defeating the Admirals.</li>\n        <li>Disbanding the Celestial Dragons’ grip on power.</li>\n        <li>Unleashing true freedom to the people of the world.</li>\n      </ol>\n    </li>\n  </ol>\n`;\n\nexport function ProseListDemo() {\n  return <Prose __html={content} />;\n}',
  listInside:
    'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h3>Unordered List</h3>\n  <ul style="font-weight: 500;">\n    <li>\n      Unordered List 1:\n      <ul>\n        <li>Unordered Inside 1-1</li>\n        <li>Unordered Inside 1-2</li>\n      </ul>\n    </li>\n    <li>\n      Unordered List 2:\n      <ul>\n        <li>\n          Unordered Inside 2-1:\n          <ul>\n            <li>Unordered Inside 2-1-1</li>\n            <li>Unordered Inside 2-1-2</li>\n          </ul>\n        </li>\n        <li>\n          Unordered Inside 2-2:\n          <ul>\n            <li>Unordered Inside 2-2-1</li>\n            <li>Unordered Inside 2-2-2</li>\n            <li>\n              Unordered Inside 2-2-3:\n              <ul>\n                <li>Unordered Inside 2-2-3-1</li>\n                <li>Unordered Inside 2-2-3-2</li>\n              </ul>\n            </li>\n          </ul>\n        </li>\n      </ul>\n    </li>\n  </ul>\n\n  <hr />\n\n  <h3>Ordered List</h3>\n  <ol style="font-weight: 500;">\n    <li style="color: #e54d2e;">\n      Ordered List 1:\n      <ol>\n        <li>Ordered Inside 1-A</li>\n        <li>Ordered Inside 1-B</li>\n      </ol>\n    </li>\n    <li style="color: #e54666;">\n      Ordered List 2:\n      <ol>\n        <li>\n          Ordered Inside 2-A:\n          <ol>\n            <li>Ordered Inside 2-A-I</li>\n            <li>Ordered Inside 2-A-II</li>\n          </ol>\n        </li>\n        <li style="color: #d6409f;">\n          Ordered Inside 2-B:\n          <ol>\n            <li>Ordered Inside 2-B-I</li>\n            <li>Ordered Inside 2-B-II</li>\n            <li style="color: #8e4ec6;">\n              Ordered Inside 2-B-III:\n              <ol>\n                <li>Ordered Inside 2-B-III-a</li>\n                <li>Ordered Inside 2-B-III-b</li>\n                <li style="color: #5b5bd6;">\n                  Ordered Inside 2-B-III-c:\n                  <ol>\n                    <li>Ordered Inside 2-B-III-c-i</li>\n                    <li>Ordered Inside 2-B-III-c-ii</li>\n                    <li style="color: #0090ff;">\n                      Ordered Inside 2-B-III-c-iii:\n                      <ol>\n                        <li>Ordered Inside 2-B-III-c-iii</li>\n                        <li>Ordered Inside 2-B-III-c-iii</li>\n                      </ol>\n                    </li>\n                  </ol>\n                </li>\n              </ol>\n            </li>\n          </ol>\n        </li>\n      </ol>\n    </li>\n  </ol>\n`;\n\nexport function ProseListInsideDemo() {\n  return <Prose __html={content} />;\n}',
  table:
    'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h3>Allies</h3>\n  <p>Here are some of their notable allies and their roles:</p>\n  <table>\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Role</th>\n        <th>Affiliation</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Shanks</td>\n        <td>Mentor</td>\n        <td>Red-Haired Pirates</td>\n      </tr>\n      <tr>\n        <td>Portgas D. Ace</td>\n        <td>Brother</td>\n        <td>Whitebeard Pirates</td>\n      </tr>\n      <tr>\n        <td>Boa Hancock</td>\n        <td>Ally</td>\n        <td>Kuja Pirates</td>\n      </tr>\n      <tr>\n        <td>Dracule Mihawk</td>\n        <td>Trainer</td>\n        <td>Warlord of the Sea</td>\n      </tr>\n    </tbody>\n  </table>\n`;\n\nexport function ProseTableDemo() {\n  return <Prose __html={content} />;\n}',
  configurator:
    'import { Prose } from "@/ui/prose";\n\n// Used for syntax highlighting\nconst html = String.raw;\n\nconst content = html`\n  <h1>Exploring the Universe of Web Development</h1>\n`;\n\n// __html={content} same of dangerouslySetInnerHTML={{ __html: htmlPurify(content) }} \nexport function ProseDemo() {\n  return <Prose{{props}} __html={content} />;\n}'
};

// Used for syntax highlighting
const html = String.raw;

const content = html`
  <h1>🌊🏴‍☠️</h1>
  <h1>The Great Pirate Era</h1>
  <h2>Gol D. Roger's Final Words</h2>
  <h3>A Legacy of Adventure</h3>
  <h4>The Straw Hat Pirates</h4>

  <h5>What Makes Luffy <a href="">Unstoppable</a>?</h5>

  <p>
    It all began with <a href="">Gol D. Roger</a>, the Pirate King, whose final words set the seas ablaze with ambition: "My treasure? It's yours if you want
    it. I left everything I gathered in one place. Now you just have to find it!" This declaration created the Great Pirate Era, where countless adventurers set
    sail to find the legendary <strong>One Piece</strong>.
  </p>

  <p>
    Among them is Monkey D. Luffy, a boy with a dream to become the next Pirate King. With his trusty straw hat, gifted by the legendary Shanks, and the power
    of the <code>Gomu Gomu no Mi</code>, Luffy is destined to change the world. Alongside his diverse and loyal crew, they face challenges, explore mysterious
    islands, and uncover secrets of the world’s history.
  </p>

  <hr />

  <p>
    The journey isn’t easy. Each step requires bravery, camaraderie, and perseverance. From battling the ruthless <strong>Warlords of the Sea</strong> to
    confronting the secrets of the <em>Void Century</em>, the Straw Hat Pirates remain undeterred. Here’s a glimpse of their remarkable story:
  </p>
`;

function Demo() {
  return <Prose __html={content} />;
}

const blockquote = html`
  <h3>Quotes</h3>
  <blockquote>"If you don’t take risks, you can’t create a future." - Monkey D. Luffy</blockquote>
  <p>And it can span into multiple lines:</p>
  <blockquote>
    "Inherited will, the swelling of the changing times, and the dreams of people, these are things that cannot be stopped. As long as people continue to seek
    the meaning of freedom, these things will never cease to be!" - Gol D. Roger
  </blockquote>
  <li>
    <ul>
      <li>list 1</li>
      <li>list 2</li>
      <li>list 3</li>
    </ul>
  </li>
  <p>
    There&apos;s also <strong>strong</strong>, <b>courage</b>, and <em>determination</em> in their journey! But, let&apos;s display some
    <code>challenges!</code>
  </p>
`;

function BlockquoteDemo() {
  return <Prose __html={blockquote} />;
}

const list = html`
  <h3>Mugiwara Crew</h3>
  <p>The core members of the Straw Hat Pirates:</p>
  <ul>
    <li>Monkey D. Luffy - The Captain</li>
    <li>Roronoa Zoro - The Swordsman</li>
    <li>Nami - The Navigator</li>
    <li>Usopp - The Sniper</li>
    <li>Sanji - The Cook</li>
    <li>Tony Tony Chopper - The Doctor</li>
    <li>Nico Robin - The Archaeologist</li>
    <li>Franky - The Shipwright</li>
    <li>Brook - The Musician</li>
    <li>Jinbe - The Helmsman</li>
  </ul>
  <p>Their ultimate goals:</p>
  <ol>
    <li>Find the legendary One Piece.</li>
    <li>
      Overcome these sub-challenges:
      <ol>
        <li>Gathering enough supplies for the journey.</li>
        <li>Recruiting allies to their cause.</li>
        <li>Surviving the harshest seas in the world.</li>
      </ol>
    </li>
    <li>Unravel the mysteries of the Void Century.</li>
    <li>
      Face incredible challenges to achieve this:
      <ol>
        <li>Decipher the Poneglyphs.</li>
        <li>Confront the guardians of the ancient secrets.</li>
        <li>Protect Robin, the only one capable of reading the ancient language.</li>
      </ol>
    </li>
    <li>Overthrow the oppressive World Government.</li>
    <li>
      This requires:
      <ol>
        <li>Defeating the Admirals.</li>
        <li>Disbanding the Celestial Dragons’ grip on power.</li>
        <li>Unleashing true freedom to the people of the world.</li>
      </ol>
    </li>
  </ol>
`;

function ListDemo() {
  return <Prose __html={list} />;
}

const listInside = html`
  <h3>Unordered List</h3>
  <ul style="font-weight: 500;">
    <li>
      Unordered List 1:
      <ul>
        <li>Unordered Inside 1-1</li>
        <li>Unordered Inside 1-2</li>
      </ul>
    </li>
    <li>
      Unordered List 2:
      <ul>
        <li>
          Unordered Inside 2-1:
          <ul>
            <li>Unordered Inside 2-1-1</li>
            <li>Unordered Inside 2-1-2</li>
          </ul>
        </li>
        <li>
          Unordered Inside 2-2:
          <ul>
            <li>Unordered Inside 2-2-1</li>
            <li>Unordered Inside 2-2-2</li>
            <li>
              Unordered Inside 2-2-3:
              <ul>
                <li>Unordered Inside 2-2-3-1</li>
                <li>Unordered Inside 2-2-3-2</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <hr />

  <h3>Ordered List</h3>
  <ol style="font-weight: 500;">
    <li style="color: #e54d2e;">
      Ordered List 1:
      <ol>
        <li>Ordered Inside 1-A</li>
        <li>Ordered Inside 1-B</li>
      </ol>
    </li>
    <li style="color: #e54666;">
      Ordered List 2:
      <ol>
        <li>
          Ordered Inside 2-A:
          <ol>
            <li>Ordered Inside 2-A-I</li>
            <li>Ordered Inside 2-A-II</li>
          </ol>
        </li>
        <li style="color: #d6409f;">
          Ordered Inside 2-B:
          <ol>
            <li>Ordered Inside 2-B-I</li>
            <li>Ordered Inside 2-B-II</li>
            <li style="color: #8e4ec6;">
              Ordered Inside 2-B-III:
              <ol>
                <li>Ordered Inside 2-B-III-a</li>
                <li>Ordered Inside 2-B-III-b</li>
                <li style="color: #5b5bd6;">
                  Ordered Inside 2-B-III-c:
                  <ol>
                    <li>Ordered Inside 2-B-III-c-i</li>
                    <li>Ordered Inside 2-B-III-c-ii</li>
                    <li style="color: #0090ff;">
                      Ordered Inside 2-B-III-c-iii:
                      <ol>
                        <li>Ordered Inside 2-B-III-c-iii</li>
                        <li>Ordered Inside 2-B-III-c-iii</li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
`;

function ListInsideDemo() {
  return <Prose __html={listInside} />;
}

const table = html`
  <h3>Allies</h3>
  <p>Here are some of their notable allies and their roles:</p>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Affiliation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Shanks</td>
        <td>Mentor</td>
        <td>Red-Haired Pirates</td>
      </tr>
      <tr>
        <td>Portgas D. Ace</td>
        <td>Brother</td>
        <td>Whitebeard Pirates</td>
      </tr>
      <tr>
        <td>Boa Hancock</td>
        <td>Ally</td>
        <td>Kuja Pirates</td>
      </tr>
      <tr>
        <td>Dracule Mihawk</td>
        <td>Trainer</td>
        <td>Warlord of the Sea</td>
      </tr>
    </tbody>
  </table>
`;

function TableDemo() {
  return <Prose __html={table} />;
}

function ConfiguratorDemo(props: ProseProps) {
  return <Prose {...props} __html={configuratorHtml} />;
}

const configuratorHtml = html`
  <h1>Title Heading 1</h1>
  <h2>Title Heading 2</h2>
  <h3>Title Heading 3</h3>
  <h4>Title Heading 4</h4>
  <h5>Title Heading 5</h5>
  <h6>Title Heading 6</h6>

  <hr />

  <h1>Exploring the Universe of Web Development</h1>
  <p>
    Web development is a vast and <a href="#">ever-evolving</a> field. Whether you are crafting your first website or optimizing complex applications, staying
    updated with the latest trends is essential. The rise of frameworks like React, Vue, and Svelte has changed how we approach building web interfaces.
    Remember, the journey of mastering web development begins with a single <code>line of code</code>. Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save your
    progress and keep moving forward.
  </p>

  <br />

  <h3>Building Blocks of Innovation</h3>
  <p>
    Imagine a world where every click, scroll, and interaction is seamless. As developers, we have the power to create experiences that inspire and empower. By
    combining design principles with functional programming, we can build websites that are both aesthetic and performant. The possibilities are endless.
  </p>

  <hr />

  <h5>Stay Curious, Keep Learning</h5>
  <p>
    Challenges will arise, but every error is an opportunity to grow. Debugging is a skill that sharpens with practice. Never be afraid to experiment with new
    ideas, break things, and rebuild them better than before.
  </p>

  <hr />

  <h3>Blockquotes</h3>
  <blockquote>
    "The best way to predict the future is to invent it." <br />
    — Alan Kay
  </blockquote>
  <p>Inspiration can often come from unexpected places:</p>
  <blockquote>
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." <br />
    — Albert Schweitzer
  </blockquote>
  <p>Remember, you can also emphasize text with <strong>strong</strong>, <b>bold</b>, or <em>italics</em> to make your message stand out!</p>

  <hr />

  <h3>Lists</h3>
  <p>Here are some essential skills for web developers:</p>
  <ul>
    <li>HTML, CSS, and JavaScript</li>
    <li>Version control with Git</li>
    <li>Responsive design principles</li>
  </ul>
  <p>And here are some goals to aim for:</p>
  <ol>
    <li>Build a portfolio website</li>
    <li>Contribute to open-source projects</li>
    <li>Learn server-side programming</li>
  </ol>

  <hr />

  <h3>Tables</h3>
  <p>Meet some influential figures in the web development community:</p>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Contribution</th>
        <th>GitHub Profile</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dan Abramov</td>
        <td>React Core Developer</td>
        <td><a href="https://github.com/gaearon" target="_blank" rel="noopener noreferrer nofollow">gaearon</a></td>
      </tr>
      <tr>
        <td>Evan You</td>
        <td>Creator of Vue.js</td>
        <td><a href="https://github.com/yyx990803" target="_blank" rel="noopener noreferrer nofollow">yyx990803</a></td>
      </tr>
      <tr>
        <td>Rich Harris</td>
        <td>Creator of Svelte</td>
        <td><a href="https://github.com/Rich-Harris" target="_blank" rel="noopener noreferrer nofollow">Rich-Harris</a></td>
      </tr>
      <tr>
        <td>Lea Verou</td>
        <td>CSS Expert and Advocate</td>
        <td><a href="https://github.com/LeaVerou" target="_blank" rel="noopener noreferrer nofollow">LeaVerou</a></td>
      </tr>
    </tbody>
  </table>
`;

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  defaultExpanded: false,
  classNames: { demoInner: "w-full text-start" }
};

const blockquoteUsage: DataTrees = {
  type: "code",
  component: BlockquoteDemo,
  code: codes.blockquote,
  defaultExpanded: false,
  classNames: { demoInner: "w-full text-start" }
};

const listUsage: DataTrees = {
  type: "code",
  component: ListDemo,
  code: codes.list,
  defaultExpanded: false,
  classNames: { demoInner: "w-full text-start" }
};

const listInsideUsage: DataTrees = {
  type: "code",
  component: ListInsideDemo,
  code: codes.listInside,
  defaultExpanded: false,
  classNames: { demoInner: "w-full text-start" }
};

const tableUsage: DataTrees = {
  type: "code",
  component: TableDemo,
  code: codes.table,
  defaultExpanded: false,
  classNames: { demoInner: "w-full text-start" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "color", type: "select", initialValue: "based", libraryValue: "based", data: ["based", "muted"] },
    { prop: "size", type: "select", initialValue: "lg", libraryValue: "lg", data: ["lg", "md", "sm"] },
    { prop: "dir", type: "select", initialValue: "auto", libraryValue: "auto", data: ["auto", "ltr", "rtl"] }
  ]
};

export const ProseDemos = {
  usage,
  blockquoteUsage,
  listUsage,
  listInsideUsage,
  tableUsage,
  configurator
};
