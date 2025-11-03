import { Console } from "@woowacourse/mission-utils";
import { PRIZE } from "./constants.js";

class LottoResult {
    calculate(lottos, winningNumbers, bonusNumber) {
        const result = {
            6: 0,
            "5+bonus": 0,
            5: 0,
            4: 0,
            3: 0,
        };

        lottos.forEach((lotto) => {
            const numbers = lotto.getNumbers();
            const matchCount = numbers.filter((n) =>
                winningNumbers.includes(n)
            ).length;
            const hasBonus = numbers.includes(bonusNumber);

            if (matchCount === 6) result["6"]++;
            else if (matchCount === 5 && hasBonus) result["5+bonus"]++;
            else if (matchCount === 5) result["5"]++;
            else if (matchCount === 4) result["4"]++;
            else if (matchCount === 3) result["3"]++;
        });

        return result;
    }

    print(result, lottosLength) {
        Console.print("\n당첨 통계\n---");
        Console.print(`3개 일치 (5,000원) - ${result["3"]}개`);
        Console.print(`4개 일치 (50,000원) - ${result["4"]}개`);
        Console.print(`5개 일치 (1,500,000원) - ${result["5"]}개`);
        Console.print(
            `5개 일치, 보너스 볼 일치 (30,000,000원) - ${result["5+bonus"]}개`
        );
        Console.print(`6개 일치 (2,000,000,000원) - ${result["6"]}개`);

        const totalPrize =
            result["3"] * 5000 +
            result["4"] * 50000 +
            result["5"] * 1500000 +
            result["5+bonus"] * 30000000 +
            result["6"] * 2000000000;

        const totalSpent = lottosLength * 1000;
        const yieldRate = (totalPrize / totalSpent) * 100;
        Console.print(`총 수익률은 ${yieldRate.toFixed(1)}%입니다.`);
    }
}

export default LottoResult;
