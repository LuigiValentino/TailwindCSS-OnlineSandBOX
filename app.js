let editorInstance;

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function() {
    editorInstance = monaco.editor.create(document.getElementById('editor-container'), {
        value: "<!-- Escribe tu HTML aquí -->",
        language: 'html',
        theme: 'vs-light',
        automaticLayout: true,
    });

    editorInstance.onDidChangeModelContent(() => {
        const htmlContent = editorInstance.getValue();
        document.getElementById('preview').innerHTML = htmlContent;
    });
});

document.getElementById('clearButton').addEventListener('click', () => {
    editorInstance.setValue('<!-- Escribe tu HTML aquí -->');
    document.getElementById('preview').innerHTML = '';
    editorInstance.focus();
});

document.getElementById('copyButton').addEventListener('click', () => {
    const htmlContent = editorInstance.getValue();
    navigator.clipboard.writeText(htmlContent).then(() => {
        alert('Código copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el código:', err);
    });
});