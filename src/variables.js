const NOTION_TOKEN = getScriptProperty("NOTION_TOKEN");
const NOTION_DB_ID = getScriptProperty("NOTION_DB_ID");
const API_PAGES_URL = "https://api.notion.com/v1/pages";
const API_DBS_URL = "https://api.notion.com/v1/databases";

const HEADERS = {
  "Content-type": "application/json",
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
};
