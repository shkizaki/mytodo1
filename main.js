$(function() {
	var $list = $('.todoList');
	var $input = $('.todoInput');
	
	//Todoを追加する関数(1)
	function addTodo(text, isComplete) {
		//リストアイテム作成
		var $li = $('<li>');
		var $text = $('<span class="text">').text(text);
		var $checkbox = $('<input type="checkbox">');
		var $remove = $('<span class="remove">削除</span>')
		$li.append($checkbox).append($text).append($remove);
		
		//完了済みの場合
		if(isComplete) {
			$li.addClass('complete');
			$checkbox.attr('checked',true);
		}
		
		//チェックボックスクリック動作
		$checkbox.click(function() {
			if ($(this).is(':checked')) {
				$li.addClass('complete');
			} else {
				$li.removeClass('complete');
			}
			//ストレージ更新
			updateStorage();
		});
		
		$remove.click(function() {
			if (window.confirm('削除してもよろしいですか？')) {
				$li.remove();
			}
			//ストレージ更新
			updateStorage();
		});
		
		
		//リスト追加
		$list.append($li);
	}
	
	//フォームを送信したときの処理
	$('.todoForm').bind('submit',function(event) {
		//フォームのデフォルト動作を止める
		event.preventDefault();
		
		//テキストボックスに入っている文字列を取得
		var text = $input.val();
		
		//todo追加
		addTodo(text);
		
		//テキストボックス空にする
		$input.val('');
		
		//ストレージ更新
		updateStorage();
	});
	
	function updateStorage() {
		var list = [];
		
		//現在のリストをすべて取得
		$list.find('li').each(function() {
			var $item = $(this);
			
			//テキストと完了状態保存
			list.push({
				text: $item.find('.text').text(),
				complete: $item.hasClass('complete')
			});
		});
		
		//文字列にしてストレージに保存
		localStorage['todo.list'] = JSON.stringify(list);
	}
	
	//初期表示時にストレージからデータを復元
	var storageList = localStorage['todo.list'];
	if (storageList) {
		JSON.parse(storageList).forEach(function(item) {
			addTodo(item.text, item.complete);
		});
	}
});