const TARGET_CHAIN = "0xf1cd"; // 61997
const state = { provider: null, account: null, chainId: null, phase: "DISCONNECTED" };
const $ = (id) => document.getElementById(id);
function render(message) { $("wallet").textContent = state.account ? `${state.account} · chain ${state.chainId}` : "Wallet disconnected"; $("status").textContent = message; $("submit").disabled = !(state.account && state.chainId === TARGET_CHAIN); }
async function connect() {
  const provider = window.ethereum;
  if (!provider) { render("No injected wallet detected."); return; }
  state.provider = provider; const accounts = await provider.request({ method: "eth_requestAccounts" }); state.account = accounts[0] || null; state.chainId = await provider.request({ method: "eth_chainId" }); state.phase = state.chainId === TARGET_CHAIN ? "READY" : "WRONG_CHAIN"; render(state.phase === "READY" ? "Ready for a bounded pair submission." : "Switch wallet to Studio Next (chain 61997).");
}
$("connect").addEventListener("click", () => connect().catch((e) => render(`Wallet error: ${e.message}`)));
$("submit").addEventListener("click", () => { state.phase = "AWAITING_DEPLOYMENT"; render("Contract address is not configured yet; no transaction was sent."); });
window.__councilState = state;
render("Connect a Studio Next wallet to continue.");
