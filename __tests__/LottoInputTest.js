import LottoInput from "../src/LottoInput";
import { Console } from "@woowacourse/mission-utils";

jest.mock("@woowacourse/mission-utils", () => ({
    Console: {
        readLineAsync: jest.fn(),
        print: jest.fn(),
    },
}));

describe("입력 검증 테스트", () => {
    let input;

    beforeEach(() => {
        input = new LottoInput();
    });

    test("구입 금액이 1000 단위가 아니면 예외 발생", async () => {
        Console.readLineAsync.mockResolvedValueOnce("1500");
        await expect(input.askPurchaseAmount()).rejects.toThrow("[ERROR]");
    });

    test("당첨 번호가 6개 미만이면 예외 발생", async () => {
        Console.readLineAsync.mockResolvedValueOnce("1,2,3,4,5");
        await expect(input.askWinningNumbers()).rejects.toThrow("[ERROR]");
    });

    test("당첨 번호에 중복이 있으면 예외 발생", async () => {
        Console.readLineAsync.mockResolvedValueOnce("1,2,3,4,5,5");
        await expect(input.askWinningNumbers()).rejects.toThrow("[ERROR]");
    });

    test("보너스 번호가 숫자가 아니면 예외 발생", async () => {
        Console.readLineAsync.mockResolvedValueOnce("a");
        await expect(input.askBonusNumber()).rejects.toThrow("[ERROR]");
    });
});
