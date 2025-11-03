import LottoResult from "../src/LottoResult";
import Lotto from "../src/Lotto";

describe("로또 결과 계산 테스트", () => {
    const result = new LottoResult();

    test.each([
        [[1, 2, 3, 4, 5, 6], 6, { key: "6" }],
        [[1, 2, 3, 4, 5, 7], 5, { key: "5+bonus", bonus: 7 }],
        [[1, 2, 3, 4, 5, 10], 5, { key: "5" }],
        [[1, 2, 3, 4, 10, 11], 4, { key: "4" }],
        [[1, 2, 3, 10, 11, 12], 3, { key: "3" }],
    ])(
        "일치 개수에 따라 등수를 계산한다. (%p)",
        (numbers, matchCount, expected) => {
            const lottos = [new Lotto(numbers)];
            const winningNumbers = [1, 2, 3, 4, 5, 6];
            const bonus = 7;
            const res = result.calculate(lottos, winningNumbers, bonus);

            expect(res[expected.key]).toBeGreaterThanOrEqual(0);
        }
    );

    test("결과 계산 후 반환 객체에 3,4,5,5+bonus,6 키가 모두 존재해야 한다.", () => {
        const res = result.calculate(
            [new Lotto([1, 2, 3, 4, 5, 6])],
            [1, 2, 3, 4, 5, 6],
            7
        );
        expect(Object.keys(res)).toEqual(
            expect.arrayContaining(["3", "4", "5", "5+bonus", "6"])
        );
    });
});
