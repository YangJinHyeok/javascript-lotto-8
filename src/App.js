import { Console } from "@woowacourse/mission-utils";
import LottoInput from "./LottoInput.js";
import LottoMachine from "./LottoMachine.js";
import LottoResult from "./LottoResult.js";

class App {
    async run() {
        try {
            const input = new LottoInput();
            const machine = new LottoMachine();
            const result = new LottoResult();

            const purchaseAmount = await input.askPurchaseAmount();
            const lottoCount = purchaseAmount / 1000;

            const lottos = machine.generateLottos(lottoCount);
            input.printPurchasedLottos(lottos);

            const winningNumbers = await input.askWinningNumbers();
            const bonusNumber = await input.askBonusNumber();

            const resultData = result.calculate(
                lottos,
                winningNumbers,
                bonusNumber
            );
            result.print(resultData, lottos.length);
        } catch (error) {
            Console.print(error.message);
            await this.run();
        }
    }
}

export default App;
