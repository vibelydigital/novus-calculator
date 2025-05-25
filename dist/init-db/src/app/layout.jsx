"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("@/styles/globals.scss");
const providers_1 = require("@/app/providers");
exports.metadata = {
    title: "Login - Novus Calculator",
    description: "Login to Novus Calculator",
};
function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <providers_1.Providers>
          {children}
        </providers_1.Providers>
      </body>
    </html>);
}
