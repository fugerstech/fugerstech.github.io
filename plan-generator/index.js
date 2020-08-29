// Name Input Field
const userName = document.getElementById("name");
// Money Price Field
const userAmount = document.getElementById("amount");
// Discount Field
const userDiscount = document.getElementById("discount");
// Currency
const userCurrency = document.getElementById("money");
// Button
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  const cost = userAmount.value;
  const currency = userCurrency.value;
  const discount = userDiscount.value;

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val, cost, currency, discount);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name, amount, currency, discount) => {
  const existingPdfBytes = await fetch("./fugersplan.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Inter.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const Inter = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 425,
    y: 603,
    size: 11,
    font: Inter,
  });

  let finalAmount = ""
  let beforeDiscount = (amount/100)*discount;
  beforeDiscount += parseInt(amount);

  switch (currency) {
    case "pound":
      finalAmount = "£" + amount;
      beforeDiscount = "£" + beforeDiscount;
      break;
    case "usd":
      finalAmount = "$" + amount;
      beforeDiscount = "$" + beforeDiscount;
      break;
    case "rupee":
      finalAmount = "₹" + amount;
      beforeDiscount = "₹" + beforeDiscount;
      break;
    case "rands":
      finalAmount = "R" + amount;
      beforeDiscount = "R" + beforeDiscount;
      break;
  }

  firstPage.drawText(finalAmount, {
    x: 497,
    y: 280,
    size: 8.8,
    font: Inter,
  });

  firstPage.drawText(beforeDiscount.toString(), {
    x: 410,
    y: 280,
    size: 8.8,
    font: Inter,
  });

  firstPage.drawText(finalAmount, {
    x: 480,
    y: 130,
    size: 20,
    font: Inter,
    color: rgb(0, 0, 0),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  let fileName = "Fugers Website Development Plan " + userName.value;

  var file = new File(
    [pdfBytes],
    fileName,
    {
      type: "application/pdf;charset=utf-8",
    }
  );
  saveAs(file);
};