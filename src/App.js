import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import { FaBold, FaItalic, FaList, FaImage, FaLink, FaStrikethrough, FaQuoteRight, FaCode, FaListOl, FaMinus, FaRegFileCode, FaDownload } from 'react-icons/fa';
import { Modal, Button, TextField } from '@material-ui/core';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [fileName, setFileName] = useState('Untitled');

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleLinkButtonClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleModalOk = () => {
    if (linkUrl.trim() !== '') {
      insertTextAtCursor(`[Link](${linkUrl}) `);
    }
    setModalIsOpen(false);
    setLinkUrl('');
  };

  const insertTextAtCursor = (text) => {
    const start = markdown.substring(0, markdownRef.current.selectionStart);
    const end = markdown.substring(markdownRef.current.selectionEnd);
    setMarkdown(start + text + end);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = fileName + '.md'; // Hier wird der Dateiname mit dem Suffix .md gesetzt
    document.body.appendChild(element); // Erforderlich, damit dies in Firefox funktioniert
    element.click();
  };

  const markdownRef = useRef(null);

  return (
    <div className="App">
      <div className="navbar">
      <div className="toolbar">
      <div className="button-container">
        {/* Existing buttons */}
        <button onClick={() => insertTextAtCursor('# H1')}><FaRegFileCode /></button>
        <button onClick={() => insertTextAtCursor('## H2')}><FaRegFileCode /></button>
        <button onClick={() => insertTextAtCursor('**Bold** ')}><FaBold /></button>
        <button onClick={() => insertTextAtCursor('*Italic* ')}><FaItalic /></button>
        <button onClick={() => insertTextAtCursor('- List\n')}><FaList /></button>
        <button onClick={() => insertTextAtCursor('![Image](url) ')}><FaImage /></button>
        <button onClick={handleLinkButtonClick}><FaLink /></button>
        <button onClick={() => insertTextAtCursor('~~Strikethrough~~ ')}><FaStrikethrough /></button>
        <button onClick={() => insertTextAtCursor('> Blockquote\n')}><FaQuoteRight /></button>
        <button onClick={() => insertTextAtCursor('```\nCodeblock\n``` ')}><FaCode /></button>
        <button onClick={() => insertTextAtCursor('1. Numbered List\n')}><FaListOl /></button>
        <button onClick={() => insertTextAtCursor('---\n')}><FaMinus /></button>
        {/* Other buttons here... */}
      </div>
      <div className="download-container">
        <input
          type="text"
          placeholder="Dateiname"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button variant="outlined" color="primary" onClick={handleDownloadMarkdown}>
          <FaDownload />
        </button>
      </div>
    </div>
    </div>
      {/* Modal */}
      <Modal open={modalIsOpen} onClose={handleModalClose} className="modal">
        <div className="modal-content">
          <h3>Gib hier den Link ein</h3>
          <TextField
            type="text"
            placeholder="Link eingeben..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
                <div className="modal-buttons">
          <button variant="contained" style={{ backgroundColor: '#f44336', color: '#fff' }} onClick={handleModalClose}>
            Cancel
          </button>
          <button variant="contained" style={{ backgroundColor: '#2196f3', color: '#fff' }} onClick={handleModalOk}>
            OK
          </button>
        </div>
        </div>
      </Modal>
      <div className="editor-preview-container">
         <textarea
          ref={markdownRef}
          className="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Gib hier deinen Markdown-Text ein..."
        />
        <div className="preview markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;
