/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroBuilder } from "./components/HeroBuilder";

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <HeroBuilder />
    </div>
  );
}
