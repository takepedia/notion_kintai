/**
 * POST された時に実行される関数
 * @param {Object} e イベントオブジェクト
 * @returns {ContentService.TextOutput} レスポンス
 */
function doPost(e) {
  const action = JSON.parse(e.postData.contents).action;
  if (action === "checkIn") {
    checkIn();
    return createResponse({
      status: "success",
      message: "Checked in successfully",
    });
  } else if (action === "checkOut") {
    checkOut();
    return createResponse({
      status: "success",
      message: "Checked out successfully",
    });
  } else {
    return createResponse({
      status: "error",
      message: "Invalid action",
    });
  }
}

/**
 * 出勤処理を行う
 */
function checkIn() {
  const params = createParams("POST", composeCheckInPayload());
  const response = UrlFetchApp.fetch(API_PAGES_URL, params);
  Logger.log(`Check-in response: ${response.getContentText()}`);
}

/**
 * 退勤処理を行う
 */
function checkOut() {
  const latestPageId = findLatestPage();
  const params = createParams("PATCH", composeCheckOutPayload());
  const response = UrlFetchApp.fetch(
    `${API_PAGES_URL}/${latestPageId}`,
    params
  );
  Logger.log(`Check-out response: ${response.getContentText()}`);
}

/**
 * 出勤処理用に日付と出勤時刻を埋めたリクエストパラメタを生成する
 * @returns {Object} リクエストパラメタ
 */
function composeCheckInPayload() {
  return {
    parent: { database_id: NOTION_DB_ID },
    properties: {
      日付: {
        title: [
          {
            text: {
              content: buildDateString(),
            },
          },
        ],
      },
      出勤時刻: {
        date: {
          start: buildDateTimeString(),
        },
      },
    },
  };
}

/**
 * 退勤処理用に退勤時刻を埋めたリクエストパラメタを生成する
 * @returns {Object} リクエストパラメタ
 */
function composeCheckOutPayload() {
  return {
    parent: { database_id: NOTION_DB_ID },
    properties: {
      退勤時刻: {
        date: {
          start: buildDateTimeString(),
        },
      },
    },
  };
}

/**
 * Notion で勤怠 DB の最新のレコード（出勤だけされているレコード）を取得する
 * @returns {string} 最新のレコードの ID
 */
function findLatestPage() {
  const queryUrl = `${API_DBS_URL}/${NOTION_DB_ID}/query`;
  const payload = JSON.stringify({
    sorts: [
      {
        property: "日付",
        direction: "descending",
      },
    ],
    page_size: 1,
  });
  const params = createParams("POST", payload);
  const response = UrlFetchApp.fetch(queryUrl, params);
  const result = JSON.parse(response.getContentText()).results;
  return result[0].id;
}
