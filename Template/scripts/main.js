import * as server from '@minecraft/server';
import { world, system, ui } from "@minecraft/server";
//ここにスクリプトを記述

//プレイヤー全員の名前を配列型に格納(格納変数->names)
function getAllPlayerNames() {
    const playerNames = [];
    
    for (const player of world.getPlayers()) {
        playerNames.push(player.nameTag); 
    }
    
    return playerNames;
}

world.afterEvents.worldInitialize.subscribe(() => {
    // プレイヤー名の配列は 'names' 変数に格納されますが、
    // ここではコンソールへのログ出力は行いません。
    const names = getAllPlayerNames();
});
//Over

//管理コンソールファンクション
function show_form_2(player){
    const form = new ui.ModalFormData();
    //スライダーは名前,最小,最大,単位,デフォルト
    form.slider("ゲーム時間(秒)/min5/def15/max20(min)",300,1200,300,900);
    //ドロップダウンは名前,選択肢(配列型{今回は変数に配列を格納})
    form.dropdown("試合の管理者を選択してください",names);
    form.show(player).then();response => {
        if (response.canceled){
            //フォームキャンセル時
            player.sendMessage("フォームはキャンセルされ、試合も開始していません");
            return;
        }
        player.sendMessage("試合時間は" + String(response.formValues[0]) + "秒です");
        if (response.formValues[1] == 0){
            player.sendMessage("試合の管理者は" + String(names[0]) + "です");
        }else if (response.formValues[1] == 1){
            player.sendMessage("試合の管理者は" + String(names[1]) + "です");
        }else if (response.formValues[1] == 2){
            player.sendMessage("試合の管理者は" + String(names[2]) + "です");
        }else if (response.formValues[1] == 3){
            player.sendMessage("試合の管理者は" + String(names[3]) + "です");
        }else if (response.formValues[4] == 1){
            player.sendMessage("試合の管理者は" + String(names[4]) + "です");
        }else {
            player.sendMessage("試合管理者オーバーフローエラー/管理者の取得に失敗しました(内部では記録されています)");
        }
    }
}
//Over

//フォーム起動監視
server.world.afterEvents.itemUse.subscribe(ev => {
    if(ev.itemStack.typeId == "minecraft:lapis_lazuli"){
        show_form_2(ev.source);
    }
});
//Over
