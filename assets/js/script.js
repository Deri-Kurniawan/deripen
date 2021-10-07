const textEditorElement = $('#textEditor');
const codeViewerElement = $('#codeViewer');
const copyCodeButtonElement = $('#copyCodeButton');
const cutCodeButtonElement = $('#cutCodeButton');
const pasteCodeButtonElement = $('#pasteCodeButton');
const clearCodeButtonElement = $('#clearCodeButton');
const resetCodeButtonElement = $('#resetCodeButton');
const actionActiveAlertElement = $('#actionActiveAlert');
const CODE_STORAGE_KEY = 'TEXT_UTF8';

if (typeof localStorage == "undefined") {
    console.error("Your browser is not supported local storage");
} else {

    console.log(typeof localStorage);

    textEditorElement.on('input', () => {
        codeViewerElement.html(textEditorElement.val());
        localStorage.setItem(CODE_STORAGE_KEY, textEditorElement.val());
        actionActiveAlertElement.text('Your code is auto saved!');
    });

    copyCodeButtonElement.on('click', () => {
        navigator.clipboard.writeText(textEditorElement.val());
        actionActiveAlertElement.text('Text have been Copied from Code Editor!').attr('class', 'd-flex float-end alert alert-success fade show');
    });

    cutCodeButtonElement.on('click', () => {
        navigator.clipboard.writeText(textEditorElement.val());
        textEditorElement.val('');
        localStorage.clear();
        actionActiveAlertElement.text('Text have been Cutted from Code Editor!').attr('class', 'd-flex float-end alert alert-dark fade show');
    });

    pasteCodeButtonElement.on('click', async () => {
        const pasteText = await navigator.clipboard.readText();
        textEditorElement.val(pasteText);
        codeViewerElement.html(pasteText);
        localStorage.setItem(CODE_STORAGE_KEY, textEditorElement.val());
        actionActiveAlertElement.text('Text have been Pasted from your Clipboard!').attr('class', 'd-flex float-end alert alert-primary fade show');
    });

    clearCodeButtonElement.on('click', () => {
        textEditorElement.val('');
        codeViewerElement.html('');
        localStorage.clear();
        actionActiveAlertElement.text('Code Editor have been Cleared!').attr('class', 'd-flex float-end alert alert-danger fade show');
    });

    resetCodeButtonElement.on('click', () => {
        const htmlTemplate = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deri Pen</title>
        </head>
            <body>
                <div class="container">
                    <div class="text-center">
                        <h1>Hello World</h1>
                        <p>Welcome To DeriPen</p>
                    </div>
                </div>
            </body>
        </html>`;

        textEditorElement.val(htmlTemplate);
        codeViewerElement.html(textEditorElement.val());
        localStorage.setItem(CODE_STORAGE_KEY, htmlTemplate);
        actionActiveAlertElement.text('Code Editor have been Reseted!').attr('class', 'd-flex float-end alert alert-warning fade show');
    });

    if (localStorage.getItem(CODE_STORAGE_KEY)) {
        textEditorElement.val(localStorage.getItem(CODE_STORAGE_KEY));
        codeViewerElement.html(localStorage.getItem(CODE_STORAGE_KEY));
    } else if (localStorage.getItem(CODE_STORAGE_KEY) === '' || localStorage.getItem(CODE_STORAGE_KEY) === "undefined") {
        localStorage.clear();
    }
}