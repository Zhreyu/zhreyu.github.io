/* Mermaid + light UX helpers for QUID microsite */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: true,
        theme: "dark",
        securityLevel: "loose",
        flowchart: { curve: "basis", htmlLabels: true },
        themeVariables: {
          primaryColor: "#151D32",
          primaryTextColor: "#E8EEFF",
          primaryBorderColor: "#1E2B4A",
          lineColor: "#6B7FA3",
          secondaryColor: "#0F1525",
          tertiaryColor: "#07090F",
          background: "#07090F",
          mainBkg: "#0F1525",
          nodeBorder: "#1E2B4A",
          clusterBkg: "#0F1525",
          titleColor: "#E8EEFF",
          edgeLabelBackground: "#0F1525",
        },
      });
    }

    var path = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".site-nav-links a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (!href || href === "#") return;
      try {
        var u = new URL(a.href, window.location.origin);
        var p = u.pathname.replace(/\/$/, "") || "/";
        if (path === p || (p !== "/quid" && path.indexOf(p) === 0)) {
          a.classList.add("active");
        }
      } catch (e) {
        /* ignore */
      }
    });
  });
})();
