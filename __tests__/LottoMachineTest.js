import LottoMachine from "../src/LottoMachine";

describe("로또 발행 기능 테스트", () => {
    test("입력된 개수만큼 로또가 발행된다.", () => {
        const machine = new LottoMachine();
        const lottos = machine.generateLottos(5);
        expect(lottos.length).toBe(5);
    });

    test("각 로또는 6개의 번호를 가진다.", () => {
        const machine = new LottoMachine();
        const lottos = machine.generateLottos(1);
        const numbers = lottos[0].getNumbers();
        expect(numbers).toHaveLength(6);
    });

    test("로또 번호는 1~45 범위 내의 숫자여야 한다.", () => {
        const machine = new LottoMachine();
        const lottos = machine.generateLottos(3);
        lottos.forEach((lotto) => {
            lotto.getNumbers().forEach((n) => {
                expect(n).toBeGreaterThanOrEqual(1);
                expect(n).toBeLessThanOrEqual(45);
            });
        });
    });

    test("로또 번호는 오름차순으로 정렬되어야 한다.", () => {
        const machine = new LottoMachine();
        const lotto = machine.generateLottos(1)[0];
        const numbers = lotto.getNumbers();
        const sorted = [...numbers].sort((a, b) => a - b);
        expect(numbers).toEqual(sorted);
    });
});
