import generateText from './sub';
import './main.css';

let app = document.createElement('div');
app.innerHTML = '<h1>hello world!</h1>';
app.appendChild(generateText());
document.body.appendChild(app);