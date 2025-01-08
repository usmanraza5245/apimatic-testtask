import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { EditorProps } from '../types';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
const Editor: React.FC<EditorProps> = ({ html, onChange }) => {

    return (
        <MdEditor style={{ height: '85vh' }} renderHTML={text => mdParser.render(text)} onChange={onChange} value={html} />
    )
}

export default Editor