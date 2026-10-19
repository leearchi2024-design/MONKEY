import { HIDDEN } from '../art/icons';
import { getLevel, HERO } from '../data/levels';
import type { Level, Route } from '../types';
import { html, type Screen } from '../ui';
import { runAmbush } from './phases/ambush';
import { runConfront } from './phases/confront';
import { runDeduce } from './phases/deduce';
import { showResult } from './phases/result';
import { runSearch } from './phases/search';

export type FailKind = 'timeout' | 'miss' | 'spotted' | 'lost' | 'bitten' | 'trap';

/** 一次挑戰的狀態 */
export interface Run {
  route: Route;
  lv: Level;
  hero: string;
  /** 證據值 0–100，低於 60 會被反咬 */
  evidence: number;
  keysFound: boolean[];
  hidden: { name: string; icon: string; found: boolean; used: boolean }[];
  deduceMistakes: number;
  confrontMistakes: number;
  /** 埋伏時被看到但用變裝帽救回的次數 */
  saves: number;
  /** 陷阱關選擇撤退 */
  retreated?: boolean;
}

export type PhaseResult = { ok: true } | { ok: false; fail: FailKind };

export interface StageChrome {
  root: HTMLElement;
  setPhase: (n: number) => void;
  setEvidence: (v: number) => void;
}

export const PHASES = ['搜證', '推理', '埋伏', '對質'];

function chrome(root: HTMLElement, run: Run): StageChrome {
  html(
    root,
    `<div class="topbar">
      <button class="round-btn" data-quit aria-label="離開">✕</button>
      <div class="stage-title"><b>第 ${run.lv.id} 關・${run.lv.title}</b><small data-phase-name></small></div>
      <div class="phase-dots" data-dots>${PHASES.map(() => '<i></i>').join('')}</div>
    </div>
    <div class="evidence-meter">🔎 證據值<div class="bar"><i data-ev style="width:100%"></i></div><span data-evn>100</span></div>`,
  );
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-dots] i'));
  const phaseName = root.querySelector('[data-phase-name]') as HTMLElement;
  const ev = root.querySelector('[data-ev]') as HTMLElement;
  const evn = root.querySelector('[data-evn]') as HTMLElement;
  return {
    root,
    setPhase(n) {
      dots.forEach((d, i) => {
        d.className = i < n ? 'done' : i === n ? 'on' : '';
      });
      phaseName.textContent = `階段 ${n + 1}／4：${PHASES[n]}`;
    },
    setEvidence(v) {
      ev.style.width = `${Math.max(0, v)}%`;
      ev.classList.toggle('low', v < 60);
      evn.textContent = String(Math.max(0, v));
    },
  };
}

export function playScreen(route: Route, id: number): Screen {
  return (root) => {
    const lv = getLevel(route, id);
    const run: Run = {
      route,
      lv,
      hero: HERO[route],
      evidence: 100,
      keysFound: [false, false, false],
      hidden: (HIDDEN[lv.scene] ?? HIDDEN.office).map((h) => ({ ...h, found: false, used: false })),
      deduceMistakes: 0,
      confrontMistakes: 0,
      saves: 0,
    };
    let alive = true;
    const stage = document.createElement('div');
    stage.className = 'stage';
    root.appendChild(stage);
    const ui = chrome(root, run);

    const quit = () => {
      alive = false;
      import('./map').then((m) => import('../ui').then((u) => u.go(m.mapScreen)));
    };
    root.querySelector('[data-quit]')!.addEventListener('click', () => {
      if (confirm('現在離開，這次挑戰消耗的愛心不會退回。確定離開？')) quit();
    });

    const finish = (ok: boolean, fail?: FailKind) => {
      if (!alive) return;
      alive = false;
      showResult(run, ok, fail);
    };

    (async () => {
      const phases: ((r: Run, s: HTMLElement, c: StageChrome) => Promise<PhaseResult>)[] = [runSearch, runDeduce, runAmbush, runConfront];
      for (let i = 0; i < phases.length; i++) {
        if (!alive) return;
        if (i === 3 && run.retreated) break; // 陷阱關撤退：不用對質
        stage.innerHTML = '';
        ui.setPhase(i);
        ui.setEvidence(run.evidence);
        const r = await phases[i](run, stage, ui);
        if (!alive) return;
        if (!r.ok) return finish(false, r.fail);
      }
      finish(true);
    })();

    return () => {
      alive = false;
    };
  };
}

/** 依 scene 的 viewBox（400×720, meet）把座標換成畫面像素 */
export function makeMapper(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const scale = Math.min(r.width / 400, r.height / 720);
  const ox = (r.width - 400 * scale) / 2;
  const oy = (r.height - 720 * scale) / 2;
  return { scale, map: (x: number, y: number) => [ox + x * scale, oy + y * scale] as [number, number] };
}
