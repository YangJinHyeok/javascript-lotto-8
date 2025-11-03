import { Console } from "@woowacourse/mission-utils";

class LottoInput {
    async askPurchaseAmount() {
        const input = await Console.readLineAsync(
            "구입금액을 입력해 주세요.\n"
        );
        const money = Number(input);

        if (isNaN(money) || money % 1000 !== 0 || money <= 0) {
            throw new Error(
                "[ERROR] 구입 금액은 1,000원 단위의 양수여야 합니다."
            );
        }
        return money;
    }

    printPurchasedLottos(lottos) {
        Console.print(`${lottos.length}개를 구매했습니다.`);
        lottos.forEach((lotto) => {
            Console.print(`[${lotto.getNumbers().join(", ")}]`);
        });
    }

    async askWinningNumbers() {
        const input = await Console.readLineAsync(
            "\n당첨 번호를 입력해 주세요.\n"
        );
        const numbers = input.split(",").map((n) => Number(n.trim()));

        if (
            numbers.length !== 6 ||
            numbers.some((n) => isNaN(n) || n < 1 || n > 45)
        ) {
            throw new Error(
                "[ERROR] 당첨 번호는 1~45 사이의 6개 숫자여야 합니다."
            );
        }

        const unique = new Set(numbers);
        if (unique.size !== 6) {
            throw new Error("[ERROR] 당첨 번호는 중복될 수 없습니다.");
        }

        return numbers;
    }

    async askBonusNumber() {
        const input = await Console.readLineAsync(
            "\n보너스 번호를 입력해 주세요.\n"
        );
        const number = Number(input);

        if (isNaN(number) || number < 1 || number > 45) {
            throw new Error(
                "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다."
            );
        }

        return number;
    }
}

export default LottoInput;
