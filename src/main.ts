import './styles.css';
import { installTextures } from './art/texture';
import { titleScreen } from './screens/title';
import { go, mount } from './ui';

installTextures();
mount(document.getElementById('app') as HTMLElement);
go(titleScreen);

// iOS Safari：避免雙擊放大
document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
