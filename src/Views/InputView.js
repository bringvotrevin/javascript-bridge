const { Console } = require('@woowacourse/mission-utils');
const { isNum, isInRange } = require('../utils/validation');
const {
  PRINT_MESSAGE,
  ERROR_MESSAGE,
  BRIDGE_RULE,
} = require('../utils/constants');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */

const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(makeBridgeAndMove) {
    Console.readLine(PRINT_MESSAGE.BRIDGE_LENGTH, (size) => {
      try {
        Console.print('');
        this.validateBridgeSize(size);
        makeBridgeAndMove(size);
      } catch (error) {
        Console.print(error);
        this.readBridgeSize(makeBridgeAndMove);
      }
    });
  },

  validateBridgeSize(size) {
    isNum(size);
    isInRange(Number(size));
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(moveBridge) {
    Console.readLine(PRINT_MESSAGE.BRIDGE_TO_MOVE, (moveDirection) => {
      try {
        this.validateMove(moveDirection);
        moveBridge(moveDirection);
      } catch (error) {
        Console.print(error);
        this.readMoving(moveBridge);
      }
    });
  },

  validateMove(moveDirection) {
    if (
      moveDirection !== BRIDGE_RULE.MOVE_UP &&
      moveDirection !== BRIDGE_RULE.MOVE_DOWN
    )
      throw ERROR_MESSAGE.VALIDATION_MOVE;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(retryGame, gameOver) {
    Console.readLine(PRINT_MESSAGE.RETRY, (RetryOrQuit) => {
      try {
        this.validadteRetryOrQuit(RetryOrQuit);
        if (RetryOrQuit === BRIDGE_RULE.QUIT) gameOver();
        else retryGame();
      } catch (error) {
        Console.print(error);
        this.readGameCommand(retryGame, gameOver);
      }
    });
  },

  validadteRetryOrQuit(retryOrQuit) {
    if (retryOrQuit !== BRIDGE_RULE.RETRY && retryOrQuit !== BRIDGE_RULE.QUIT)
      throw ERROR_MESSAGE.VALIDATION_RETRY_OR_QUIT;
  },
};

module.exports = InputView;
