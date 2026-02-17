export function printRecipe(recipe) {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head><title>${recipe.name}</title>
      <style>
        body { font-family: 'Open Sans', sans-serif; max-width: 800px; margin: 2rem auto; }
        h1 { color: #008751; }
        .ingredients, .method { margin: 2rem 0; }
      </style>
      </head>
      <body>
        <h1>${recipe.name}</h1>
        <img src="${recipe.image}" style="max-width:100%;">
        <div class="ingredients">
          <h2>Ingredients</h2>
          <ul>
            ${recipe.ingredients.map((ing) => `<li>${ing.measure} ${ing.name}</li>`).join("")}
          </ul>
        </div>
        <div class="method">
          <h2>Method</h2>
          <p>${recipe.instructions.replace(/\n/g, "<br>")}</p>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
