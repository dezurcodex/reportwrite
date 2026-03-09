const doc = {
  draftText: document.getElementById("draftText"),
  requestNote: document.getElementById("requestNote"),
  stylePreset: document.getElementById("stylePreset"),
  orgPreset: document.getElementById("orgPreset"),
  outputFormat: document.getElementById("outputFormat"),
  section1Result: document.getElementById("section1Result")
};

function safe(v) {
  return (v || "").trim();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detectDraftFormat(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return "list";

  const bulletPattern = /^([-*•]|\d+[.)]|[가-힣A-Za-z][.)])\s+/;
  const bulletLike = lines.filter((line) => bulletPattern.test(line)).length;
  if (bulletLike >= Math.ceil(lines.length * 0.6)) return "list";

  const shortLines = lines.filter((line) => line.length <= 45).length;
  if (shortLines >= Math.ceil(lines.length * 0.7)) return "list";

  return "list";
}

function polishBaseSentence(text) {
  const cleaned = safe(text).replace(/\s+/g, " ").replace(/[.]+$/, "");
  if (!cleaned) return "본 사업은 국민 체감 성과를 중심으로 체계적으로 추진";
  return cleaned;
}

function styleGuide(style) {
  const guides = {
    balanced: "핵심 근거와 실행계획을 균형 있게 정리",
    executive: "의사결정 관점에서 핵심 쟁점을 선명하게 정리",
    approval: "결재 흐름에서 필요한 책임과 절차를 명확하게 정리",
    audit: "감사 대응 관점에서 근거와 통제 요소를 분명하게 정리"
  };
  return guides[style] || guides.balanced;
}

function orgGuide(org) {
  const guides = {
    msit: "정책 정합성과 범부처 연계성 중심",
    public: "집행력·성과관리·서비스 안정성 중심",
    local: "주민 체감도와 현장 실행성 중심",
    common: "목표·근거·일정·책임의 기본 구조 중심"
  };
  return guides[org] || guides.common;
}

function makeProse(base, variant) {
  const variants = [
    `${base} 추진 과정에서 실행계획과 점검체계를 구체화하여 이행 가능성을 높이겠습니다.`,
    `${base} 관련 절차와 책임 구조를 재정렬해 검토·결재 단계의 판단 부담을 줄이겠습니다.`,
    `${base}의 실효성을 높이기 위해 이행관리와 성과관리 기준을 함께 강화하겠습니다.`
  ];
  return variants[variant];
}

function makeListItems(base, variant) {
  if (variant === 0) {
    return [`${base} 추진 단계별 실행계획 및 점검체계 구체화`];
  }
  if (variant === 1) {
    return [`${base} 관련 절차·책임 구조 재정렬로 검토 효율성 강화`];
  }
  return [`${base} 실효성 확보를 위한 이행관리·성과관리 기준 강화`];
}

function buildReason(variant, styleText, orgText) {
  const reasons = [
    `초안의 핵심 의도를 유지하면서 실행계획과 점검요소를 결합해, 보고자가 추진 가능성을 빠르게 판단할 수 있도록 구조화했습니다. 또한 ${styleText} 방식과 ${orgText} 기준을 반영해 보고 문서 적합성을 높였습니다.`,
    `결재 과정에서 반복적으로 확인되는 절차·책임 불명확 문제를 줄이기 위해 문장 구조를 간결하게 재배치했습니다. 같은 정보를 더 짧고 선명하게 보여 검토 시간을 줄이도록 조정했습니다.`,
    `성과 표현과 이행관리 표현을 함께 배치해 계획의 실행 가능성과 사후 관리 가능성을 동시에 확보했습니다. 결과적으로 추진 논리와 방어 논리를 균형 있게 제시하도록 정리했습니다.`
  ];
  return reasons[variant];
}

function buildConsensusPhrases(draft, style, org, format) {
  const base = polishBaseSentence(draft);
  const styleText = styleGuide(style);
  const orgText = orgGuide(org);

  return [0, 1, 2].map((idx) => {
    if (format === "list") {
      const listItems = makeListItems(base, idx);
      return {
        format: "list",
        listItems,
        copyText: listItems.map((item) => `- ${item}`).join("\n"),
        reason: buildReason(idx, styleText, orgText)
      };
    }

    const sentence = makeProse(base, idx);
    return {
      format: "prose",
      sentence,
      copyText: sentence,
      reason: buildReason(idx, styleText, orgText)
    };
  });
}

function renderPhraseBlock(item) {
  if (item.format === "list") {
    return `<ul>${item.listItems.map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>`;
  }
  return `<p class="phrase-text">${escapeHtml(item.sentence)}</p>`;
}

function renderSection1() {
  const draft = safe(doc.draftText.value);
  const style = safe(doc.stylePreset.value);
  const org = safe(doc.orgPreset.value);
  const forced = safe(doc.outputFormat.value) || "list";
  const format = forced === "auto" ? detectDraftFormat(draft) : forced;
  const results = buildConsensusPhrases(draft, style, org, format);

  doc.section1Result.innerHTML = results
    .map(
      (item, idx) => `
      <div class="card">
        <span class="badge">결과물 ${idx + 1}</span>
        ${renderPhraseBlock(item)}
        <p><strong>추천 사유:</strong> ${escapeHtml(item.reason)}</p>
        <div class="row-end">
          <button class="copy-btn" data-label="결과 복사" data-copy="${encodeURIComponent(item.copyText)}">결과 복사</button>
        </div>
      </div>
    `
    )
    .join("");
}

document.addEventListener("click", (e) => {
  const copyBtn = e.target.closest("[data-copy]");
  if (!copyBtn) return;

  const text = decodeURIComponent(copyBtn.getAttribute("data-copy"));
  const original = copyBtn.getAttribute("data-label") || copyBtn.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "복사 완료";
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 900);
  });
});

document.getElementById("runSection1").addEventListener("click", renderSection1);
