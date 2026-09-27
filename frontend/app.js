const TARGET_CHAIN = "0xf1cd"; // 61997`r`nconst CONTRACT_ADDRESS = "0x66Cc5CbB2ABf459f75b63699fbd3cf5c8c366b2c";
const state = { provider: null, account: null, chainId: null, phase: "DISCONNECTED" };
const $ = (id) => document.getElementById(id);
function render(message) { $("wallet").textContent = state.account ? `${state.account} · chain ${state.chainId}` : "Wallet disconnected"; $("status").textContent = message; $("submit").disabled = !(state.account && state.chainId === TARGET_CHAIN); }
async function connect() {
  const provider = window.ethereum;
  if (!provider) { render("No injected wallet detected."); return; }
  state.provider = provider; const accounts = await provider.request({ method: "eth_requestAccounts" }); state.account = accounts[0] || null; state.chainId = await provider.request({ method: "eth_chainId" }); state.phase = state.chainId === TARGET_CHAIN ? "READY" : "WRONG_CHAIN"; render(state.phase === "READY" ? "Ready for a bounded pair submission." : "Switch wallet to Studio Next (chain 61997).");
}
$("connect").addEventListener("click", () => connect().catch((e) => render(`Wallet error: ${e.message}`)));
$("submit").addEventListener("click", () => { state.phase = "READY"; render(`Deployed council ${CONTRACT_ADDRESS}; submission flow is available after pair fields are entered.`); });
window.__councilState = state;
render("Connect a Studio Next wallet to continue.");
