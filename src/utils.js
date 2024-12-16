/**
 * スクリプトプロパティを取得する
 * @param {Object} key プロパティのキー
 * @returns {string} プロパティの値
 */
function getScriptProperty(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

/**
 * レスポンスを作成する
 * @param {Object} responseObj レスポンス内容
 * @returns {ContentService.TextOutput} クライアントに返すレスポンス
 */
function createResponse(responseObj) {
  return ContentService.createTextOutput(
    JSON.stringify(responseObj)
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * メソッドとペイロードから HTTP リクエストパラメタを生成する
 * @param {string} method HTTP メソッド種別
 * @param {Object} payload リクエストボディのデータ
 * @returns {Object} HTTP リクエストパラメタ
 */
function createParams(method, payload) {
  return {
    method,
    headers: HEADERS,
    payload: JSON.stringify(payload),
  };
}

/**
 * 日付の文字列を取得する
 * @returns {string} yyyy/MM/dd 形式の日付
 */
function buildDateString() {
  const today = new Date();
  return Utilities.formatDate(today, "Asia/Tokyo", "yyyy/MM/dd");
}

/**
 * 日時の文字列を取得する
 * @returns {string} yyyy-MM-dd'T'HH:mm:ssXXX 形式の日時
 */
function buildDateTimeString() {
  const today = new Date();
  return Utilities.formatDate(today, "Asia/Tokyo", `yyyy-MM-dd'T'HH:mm:ssXXX`);
}
