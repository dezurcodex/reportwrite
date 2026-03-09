const doc = {
  draftText: document.getElementById("draftText"),
  requestNote: document.getElementById("requestNote"),
  section1Result: document.getElementById("section1Result"),
  resetAll: document.getElementById("resetAll")
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

function polishBaseSentence(text) {
  const cleaned = safe(text).replace(/\s+/g, " ").replace(/[.]+$/, "");
  if (!cleaned) return "본 사업은 국민 체감 성과를 중심으로 체계적으로 추진";
  return cleaned;
}

function buildReason(variant, request) {
  const reqNote = safe(request)
    ? "요청사항의 의도를 유지하면서"
    : "요청사항이 비어 있어 일반적인 공공 보고문 원칙을 적용해";

  const reasons = [
    `${reqNote} 핵심 판단 요소를 앞부분에 배치해 검토자가 목적과 실행 방향을 즉시 파악하도록 정리했습니다.`,
    `${reqNote} 절차와 책임 정보를 한 축으로 묶어 결재 단계에서 확인해야 할 항목이 빠르게 보이도록 구성했습니다.`,
    `${reqNote} 실행관리와 성과관리 요소를 함께 배치해 추진 논리와 사후관리 가능성을 동시에 확보하도록 조정했습니다.`
  ];
  return reasons[variant];
}

function makeListItems(base, request, variant) {
  const req = safe(request);

  if (variant === 0) {
    return [`${base} 단계별 실행 우선순위와 점검 기준 정렬`];
  }
  if (variant === 1) {
    return [`${base} 관련 절차·책임 구조 재배열로 검토 효율 개선`];
  }
  return [`${base} 실효성 확보를 위한 이행관리·성과관리 기준 강화`];
}

function buildConsensusPhrases(draft, request) {
  const base = polishBaseSentence(draft);

  return [0, 1, 2].map((idx) => {
    const listItems = makeListItems(base, request, idx);
    return {
      listItems,
      copyText: listItems.map((item) => `- ${item}`).join("\n"),
      reason: buildReason(idx, request)
    };
  });
}


function resetAll() {
  doc.draftText.value = "";
  doc.requestNote.value = "";
  doc.section1Result.innerHTML = "";
}
function renderSection1() {
  const draft = safe(doc.draftText.value);
  const request = safe(doc.requestNote.value);
  const results = buildConsensusPhrases(draft, request);

  doc.section1Result.innerHTML = results
    .map(
      (item, idx) => `
      <div class="card">
        <span class="badge">결과물 ${idx + 1}</span>
        <ul>${item.listItems.map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>
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
if (doc.resetAll) doc.resetAll.addEventListener("click", resetAll);



