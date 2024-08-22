export default defineEventHandler(async (event) => {
  const html = (await useStorage("assets:templates").getItem(
    "index.html"
  )) as string;
  const css = await useStorage("assets:templates").getItem("index.css");
  const js = await useStorage("assets:templates").getItem("index.js");

  // Insert CSS into HTML
  let modifiedHtml = html.replace(
    "</head>",
    `<style>
       ${css}
      </style>
    </head>`
  );

  // Insert JavaScript into HTML
  modifiedHtml = modifiedHtml.replace(
    "</body>",
    `<script>
       ${js}
      </script>
    </body>`
  );
  

  event.node.res.setHeader("Content-Type", "text/html");
  return modifiedHtml;
});