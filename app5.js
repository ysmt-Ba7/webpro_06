"use strict";
const { name } = require("ejs");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

const cocData = {
  short: [
    { name: "気絶あるいは金切声の発作", detail: "1D10ラウンドの間，探索者は絶叫するか、その場に倒れ込み行動不能になる。" },
    { name: "パニック状態で逃げだす", detail: "1D10ラウンドの間、可能な限り速く、かつ安全と思われる方向へ逃げ出す。" },
    { name: "肉体的なヒステリーあるいは感情の噴出", detail: "1D10ラウンドの間、大笑い、大泣き、激しい震えなど制御不能な感情に支配される。" },
    { name: "意味不明の会話あるいは多弁症", detail: "1D10ラウンドの間、支離滅裂なことを叫び続け、コミュニケーションが不可能になる。" },
    { name: "極度の恐怖症", detail: "1D10ラウンドの間、特定の対象（または全員）に対して極度の恐怖を感じ、遠ざかろうとする。" },
    { name: "殺人癖あるいは自殺癖", detail: "1D10ラウンドの間、周囲の者を殺そうとするか、自らの命を絶とうとする狂乱状態。" },
    { name: "幻覚あるいは妄想", detail: "1D10ラウンドの間、存在しないものが見えたり、ありえない事実を信じ込んだりする。" },
    { name: "反響動作あるいは反響言語", detail: "1D10ラウンドの間、周囲の者の動作や言葉をそのまま真似し続ける。" },
    { name: "奇妙なものをたべたがる", detail: "1D10ラウンドの間、泥、人肉、粘着物など、通常は食べないものを口にしようとする。" },
    { name: "昏迷あるいは緊張症", detail: "1D10ラウンドの間、胎児のような姿勢で固まるか、一切の自発的な行動ができなくなる。" }
  ],
  long: [
    { name: "健忘症", detail: "1D10時間、自分の名前や仲間のことを忘れる。知的な技能は使用不可。" },
    { name: "激しい恐怖症", detail: "1D10時間、特定の対象に怯え続ける。対象が視界になくても常にその影を感じる。" },
    { name: "幻覚", detail: "1D10時間、現実と区別がつかない幻覚を見る。正気度をさらに失うリスクがある。" },
    { name: "奇妙な性的嗜好", detail: "1D10時間、公序良俗に反するような異常な性的欲求に支配される。" },
    { name: "フェティッシュ", detail: "1D10時間、特定の物体や人物に異常に執着し、それがないとパニックになる。" },
    { name: "制御不能のチック、震え", detail: "1D10時間、激しい震えにより技能の成功率が半分になる、または会話不能。" },
    { name: "心因性視覚・難聴障害", detail: "1D10時間、目が見えない、あるいは耳が聞こえない状態になる。" },
    { name: "短時間の心因反応", detail: "1D10時間、妄想に基づいた奇行や支離滅裂な行動をとる。" },
    { name: "一時的偏執症（パラノイア）", detail: "1D10時間、誰も信じられなくなる。仲間が自分を殺そうとしていると思い込む。" },
    { name: "強迫観念にとりつかれた行動", detail: "1D10時間、手を洗い続ける、銃を確認し続けるなどの行為を止められなくなる。" }
  ]
};

app.get("/coc", (req, res) => {
  res.render('coc_list', { data: cocData });
});

app.get("/coc/create", (req, res) => {
  res.redirect('/public/coc_new.html');
});

app.get("/coc/:id", (req, res) => {
  const id = req.params.id;
  const detail = cocData[id];
  res.render('coc_detail', { id: id, item: detail });
});

app.get("/coc/delete/:id", (req, res) => {
  cocData.splice(req.params.id, 1);
  res.redirect('/coc');
});

app.post("/coc", (req, res) => {
  const newData = {
    type: req.body.type,
    name: req.body.name,
    detail: req.body.detail,
  };
  cocData.push(newData);
  res.redirect('/coc');
});

app.get("/coc/edit/:id", (req, res) => {
  const id = req.params.id;
  const detail = cocData[id];
  res.render('coc_edit', { id: id, item: detail });
});

app.post("/coc/update/:id", (req, res) => {
  const id = req.params.id;
  cocData[id] = {
    type: req.body.type,
    name: req.body.name,
    detail: req.body.detail,
  };
  res.redirect('/coc');
});

let mhData = [
  { title: "モンスターハンター", name: "火竜リオレウス" ,feature: "赤い甲殻に身を包む，火竜とも呼ばれる大型の飛竜種．生息域の広さや生態系の上位に位置づけられていることから，空の王者と謳われることもある．"},
  { title: "モンスターハンターG", name: "蒼火竜リオレウス亜種" ,feature: "蒼穹を思わせる鮮やかな蒼色の外殻と緑色に染まった翼膜が印象的な火竜リオレウスの亜種．"},
  { title: "モンスターハンターポータブル", name: "火竜リオレウス" ,feature: "同上"},
  { title: "モンスターハンター2（ドス）", name: "鋼龍クシャルダオラ" ,feature: "全身が鋼鉄の強度と性質を持つ鱗や甲殻に覆われていることから鋼龍と呼ばれる．極めて希少な種族である古龍に分類され，風を用いて天候を変化させたり竜巻を発生させる能力を有する．"},
  { title: "モンスターハンターポータブル 2nd", name: "轟竜ティガレックス" ,feature: "原始的な風貌の大型の飛竜種．性格は極めて獰猛で，非常に発達した呼吸器官から放たれる方向は物体を粉砕するほどの威力を誇り，この特徴から轟竜の異名を有する．"},
  { title: "モンスターハンターポータブル2nd G", name: "迅竜ナルガクルガ" ,feature: "原始的な骨格構造を残したまま進化した種であり，驚異的な俊敏性を有している．その特徴から，迅竜と呼ばれている．"},
  { title: "モンスターハンター3（トライ）", name: "海竜ラギアクルス" ,feature: "水中での活動に関しては海竜種の中でも軍を抜いた適性を有し，種を代表して海竜の異名で呼ばれている．"},
  { title: "モンスターハンターポータブル 3rd", name: "雷狼竜ジンオウガ" ,feature: "主に自然豊かな山岳地帯に生息しており，甲殻は蓄電殻，体毛は帯電毛という器官を備えている．名前の通りこれらの器官は電気を貯えており，戦闘時にはこれらの電気を解放して戦う様子から雷狼竜の異名を有している．"},
  { title: "モンスターハンター3（トライ）G", name: "砕竜ブラキディオス" ,feature: "共生関係にある爆発する粘菌を扱いながら戦う，性格は非常に獰猛である．たとえ動きを止めた相手であろうと追撃の手を止めない様子から．砕竜と呼ばれている．"},
  { title: "モンスターハンター4", name: "黒蝕竜ゴア・マガラ" ,feature: "生態が謎に包めれたモンスター．盲目である代わりに，自身の鱗粉を周囲に撒き散らしてそれを独自の触覚で感知している．この鱗粉は極めて危険なもので，吸い込んだモンスターは見境なく周囲を攻撃し始めるウイルスのようなものでもある．この鱗粉は後に狂竜ウイルスと名付けられ，ゴア・マガラにも黒蝕竜の異名が名付けられた．"},
  { title: "モンスターハンター4G", name: "千刃竜セルレギオス" ,feature: "縄張り意識と闘争心が強く，空中制御能力が非常に高く，空中戦では他のモンスターの追随を許さない．全身が刃鱗と呼ばれる鋭い鱗に覆われ，千刃竜の名で呼ばれている．"},
  { title: "モンスターハンタークロス", name: "斬竜ディノバルド" ,feature: "熱帯気候の密林や火山など，高温地域に生息している．尻尾が非常に発達しており，刃のような鋭さを有している．これを武器として活用していることから，斬竜の異名を有している．"},
  { title: "モンスターハンターダブルクロス", name: "天彗龍バルファルク" ,feature: "古龍種に分類される，驚異的な飛行能力を有すモンスター．周囲の空気を龍気と呼ばれるエネルギーに変換し，これを特殊に発達した翼から噴射して飛行しており，その速度は音速に到達することも．翼から龍気を吹き出しながら飛行する姿はまるで彗星のようであるため，天彗龍の異名を持つ．"},
  { title: "モンスターハンター：ワールド", name: "滅尽龍ネルギガンテ" ,feature: "全身が黒いトゲに覆われ，非常に発達した双角を有する古龍種．類まれな再生能力を備えており，攻撃のために飛ばしたトゲ程度なら瞬く間に再生する．性格は獰猛であり，目に付く生物すべてを破壊するさまから滅尽龍と呼ばれている．"},
  { title: "モンスターハンターワールド：アイスボーン", name: "冰龍イヴェルカーナ" ,feature: "過冷却水と呼ばれる氷点下を下回る液体を扱う古龍種．万物を凍てつかせる様から冰竜の異名を名付けられた．"},
  { title: "モンスターハンターライズ", name: "怨虎竜マガイマガド" ,feature: "鬼火と呼ばれる紫色に光る特殊ガスを扱うモンスター．恐ろしい面構えや厳しい甲殻は怨念に満ちた亡霊武者を想起させ，鬼火を駆使しながら戦う様子からも怨虎竜の異名を有している．"},
  { title: "モンスターハンターライズ：サンブレイク", name: "爵銀龍メル・ゼナ" ,feature: "白銀色の外殻や，金属のような黒色の鱗に金の差し色が入った風貌の古龍種．気高い佇まいと優雅な風貌を持つが，残忍にして狡猾な性格である．また，外見からは考えられぬような圧倒的フィジカルを誇り，黒煙をまといながら瞬間移動と見紛うほどの高速移動を披露している．周囲の生物から一線を画した風貌や佇まいから，爵銀龍の異名を有す．"},
  { title: "モンスターハンターワイルズ", name: "鎖刃竜アルシュベルド" ,feature: "両翼碗に鎖状に発達した鎖刃と呼ばれる器官を備えており，これらを駆使して戦うことから鎖刃竜と呼ばれる．また，情報でしか記録が残っておらず，本来絶滅したはずである種族であることから絶滅種という種族にも分類されている．"}
];

app.get("/mh", (req, res) => {
  res.render('mh_list', { data: mhData });
});

app.get('/mh/:id', (req, res) => {
  const id = req.params.id;
  res.render('mh_detail', { item: mhData[id], id: id });
});

app.get("/mh/create", (req, res) => {
  res.redirect('/public/mh_new.html');
});

app.post("/mh", (req, res) => {
  const newData = {
    title: req.body.title,
    name: req.body.name,
    feature: req.body.feature
  };
  mhData.push(newData);
  res.redirect('/mh');
});

app.get("/mh/edit/:id", (req, res) => {
  const id = req.params.id;
  const detail = mhData[id];
  res.render('mh_edit', { id: id, item: detail });
});

app.post("/mh/update/:id", (req, res) => {
  const id = req.params.id;
  mhData[id] = {
    title: req.body.title,
    name: req.body.name,
    feature: req.body.feature
  };
  res.redirect('/mh');
});

app.get("/mh/delete/:id", (req, res) => {
  mhData.splice(req.params.id, 1);
  res.redirect('/mh');
});

let charaData = [
  { year: 2015, month: 7, name: "カタリナ", element: "水", weapon: "剣", cv: "沢城みゆき" },
  { year: 2015, month: 9, name: "ラカム", element: "火", weapon: "銃", cv: "平田広明" },
  { year: 2015, month: 11, name: "イオ" , element: "光", weapon: "杖", cv: "田村ゆかり"},
  { year: 2015, month: 12, name: "ロゼッタ" , element: "風", weapon: "短剣", cv: "田中理恵"},
  { year: 2016, month: 2, name: "オイゲン" , element: "土", weapon: "銃", cv: "藤原啓治/山路和弘"},
  { year: 2016, month: 4, name: "黒騎士" , element: "闇", weapon: "剣・銃", cv: "朴璐美"},
  { year: 2016, month: 8, name: "ゾーイ(水着)" , element: "闇", weapon: "剣", cv: "小清水亜美"},
  { year: 2016, month: 10, name: "リーシャ" , element: "風", weapon: "剣", cv: "川澄綾子"},
  { year: 2016, month: 12, name: "ルシオ" , element: "光", weapon: "剣・刀", cv: "櫻井孝宏"},
  { year: 2017, month: 2, name: "オーキス" , element: "闇", weapon: "格闘・短剣", cv: "茅原実里"},
  { year: 2017, month: 3, name: "スツルム" , element: "火", weapon: "剣・刀", cv: "伊藤かな恵"},
  { year: 2017, month: 4, name: "ドランク" , element: "水", weapon: "杖", cv: "杉田智和"},
  { year: 2017, month: 11, name: "ヴィーラ" , element: "光", weapon: "斧・槍", cv: "今井麻美"},
  { year: 2017, month: 12, name: "オリヴィエ" , element: "闇", weapon: "剣", cv: "坂本真綾"},
  { year: 2018, month: 4, name: "ブローディア" , element: "土", weapon: "剣・刀", cv: "平野綾"},
  { year: 2018, month: 5, name: "カイン" , element: "土", weapon: "刀", cv: "寺島拓篤"},
  { year: 2018, month: 8, name: "フォリア" , element: "水", weapon: "杖・格闘", cv: "内田真礼"},
  { year: 2018, month: 10, name: "エウロペ" , element: "水", weapon: "杖・槍", cv: "中原麻衣"},
  { year: 2018, month: 12, name: "シヴァ" , element: "火", weapon: "槍・杖", cv: "速水奨"},
  { year: 2019, month: 2, name: "フェリ" , element: "闇", weapon: "短剣", cv: "米澤円"},
  { year: 2019, month: 4, name: "グリームニル" , element: "風", weapon: "槍・杖", cv: "緒方恵美"},
  { year: 2019, month: 9, name: "モニカ" , element: "風", weapon: "剣・刀", cv: "辻あゆみ"},
  { year: 2019, month: 11, name: "ジャンヌダルク" , element: "光", weapon: "剣・槍", cv: "潘めぐみ"},
  { year: 2019, month: 12, name: "ヘレル・ベン・シャレム" , element: "闇", weapon: "槍・杖", cv: "伊瀬茉莉也"},
  { year: 2019, month: 12, name: "ノア" , element: "光", weapon: "杖・銃", cv: "石川界人"},
  { year: 2020, month: 2, name: "レイ" , element: "闇", weapon: "杖・刀", cv: "茅野愛衣"},
  { year: 2020, month: 3, name: "ムゲン" , element: "火", weapon: "格闘・楽器", cv: "玄田哲章"},
  { year: 2020, month: 4, name: "ラインハルザ" , element: "火", weapon: "格闘", cv: "松田健一郎"},
  { year: 2020, month: 6, name: "レオナ" , element: "土", weapon: "槍", cv: "山村響"},
  { year: 2020, month: 9, name: "黄金の騎士" , element: "土", weapon: "剣", cv: "茅野愛衣"},
  { year: 2020, month: 12, name: "サンダルフォン(アナザー)" , element: "土", weapon: "剣・刀", cv: "鈴木健一"},
  { year: 2021, month: 1, name: "カリオストロ" , element: "光", weapon: "杖", cv: "丹下桜"},
  { year: 2021, month: 4, name: "ナルメア" , element: "風", weapon: "刀", cv: " M・A・O"},
  { year: 2021, month: 6, name: "ネハン" , element: "光", weapon: "銃・格闘", cv: "近藤隆"},
  { year: 2021, month: 7, name: "ポセイドン" , element: "水", weapon: "槍", cv: "小野大輔"},
  { year: 2021, month: 9, name: "リッチ" , element: "闇", weapon: "杖", cv: "高橋花林"},
  { year: 2021, month: 12, name: "ランスロット" , element: "水", weapon: "剣・短剣", cv: "小野友樹"},
  { year: 2021, month: 12, name: "フェディエル" , element: "闇", weapon: "剣・格闘", cv: "田野アサミ"},
  { year: 2022, month: 1, name: "ウィルナス" , element: "火", weapon: "格闘・斧", cv: "水中雅章"},
  { year: 2022, month: 3, name: "ユニ" , element: "光", weapon: "杖", cv: "茅野愛衣"},
  { year: 2022, month: 6, name: "ガレヲン" , element: "土", weapon: "杖", cv: "三森すずこ"},
  { year: 2022, month: 8, name: "ワムデュス" , element: "水", weapon: "杖・斧", cv: "長縄まりあ"},
  { year: 2022, month: 9, name: "パーシバル" , element: "火", weapon: "剣", cv: "逢坂良太"},
  { year: 2022, month: 12, name: "シャルロッテ" , element: "風", weapon: "剣", cv: "名塚佳織"},
  { year: 2022, month: 12, name: "ミカエル" , element: "火", weapon: "剣", cv: "沢城みゆき"},
  { year: 2023, month: 1, name: "ハールート・マールート" , element: "闇", weapon: "短剣", cv: "加藤英美里"},
  { year: 2023, month: 2, name: "ルオー" , element: "光", weapon: "格闘・杖", cv: "佐藤拓也"},
  { year: 2023, month: 3, name: "イーウィヤ" , element: "風", weapon: "格闘", cv: "引坂理絵"},
  { year: 2023, month: 6, name: "コスモス" , element: "光", weapon: "銃・剣", cv: "皆川純子"},
  { year: 2023, month: 9, name: "カグヤ" , element: "風", weapon: "杖", cv: "ゆきのさつき"},
  { year: 2023, month: 11, name: "ガブリエル" , element: "水", weapon: "杖", cv: "國府田マリ子"},
  { year: 2023, month: 12, name: "ゼタ" , element: "火", weapon: "槍", cv: "花澤香菜"},
  { year: 2023, month: 12, name: "ウリエル" , element: "土", weapon: "格闘", cv: "堀内賢雄"},
  { year: 2024, month: 2, name: "サンダルフォン" , element: "光", weapon: "剣・刀", cv: "鈴村健一"},
  { year: 2024, month: 3, name: "フェニー" , element: "火", weapon: "杖", cv: "小原好美"},
  { year: 2024, month: 6, name: "オロロジャイア" , element: "闇", weapon: "斧・杖", cv: "男性：日野聡，女性：徳井青空"},
  { year: 2024, month: 8, name: "メドゥーサ" , element: "土", weapon: "格闘・杖", cv: "水橋かおり"},
  { year: 2024, month: 9, name: "ヴェイン" , element: "風", weapon: "槍・斧", cv: "江口拓也"},
  { year: 2024, month: 12, name: "ヤチマ" , element: "水", weapon: "杖", cv: "鈴木みのり"},
  { year: 2024, month: 12, name: "ラファエル" , element: "風", weapon: "格闘", cv: "三上哲"},
  { year: 2025, month: 2, name: "ユエル" , element: "火", weapon: "刀・楽器", cv: "植田佳奈"},
  { year: 2025, month: 3, name: "バサラ" , element: "光", weapon: "刀・格闘", cv: "間島淳司"},
  { year: 2025, month: 5, name: "ジークフリート" , element: "土", weapon: "剣・刀", cv: "井上和彦"},
  { year: 2025, month: 8, name: "サリエル" , element: "闇", weapon: "斧", cv: "石田彰"},
  { year: 2025, month: 9, name: "シルヴィア" , element: "水", weapon: "剣", cv: "白石涼子"},
  { year: 2025, month: 10, name: "メーテラ" , element: "風", weapon: "弓", cv: "柚木涼香"}
];

app.get("/gbf", (req, res) => {
  res.render('gbf_list', { data: charaData });
});

app.get("/gbf/create", (req, res) => {
  res.redirect('/public/gbf_new.html');
});

app.get("/gbf/:id", (req, res) => {
  const id = req.params.id;
  const detail = charaData[id];
  res.render('gbf_detail', { id: id, item: detail });
});

app.get("/gbf/delete/:id", (req, res) => {
  charaData.splice(req.params.id, 1);
  res.redirect('/gbf');
});

app.post("/gbf", (req, res) => {
  const newData = {
    year: req.body.year,
    month: req.body.month,
    name: req.body.name,
    element: req.body.element,
    weapon: req.body.weapon,
    cv: req.body.cv,
  };
  charaData.push(newData);
  res.redirect('/gbf');
});

app.get("/gbf/edit/:id", (req, res) => {
  const id = req.params.id;
  const detail = charaData[id];
  res.render('gbf_edit', { id: id, item: detail });
});

app.post("/gbf/update/:id", (req, res) => {
  const id = req.params.id;
  charaData[id] = {
    year: req.body.year,
    month: req.body.month,
    name: req.body.name,
    element: req.body.element,
    weapon: req.body.weapon,
    cv: req.body.cv,
  };
  res.redirect('/gbf');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
