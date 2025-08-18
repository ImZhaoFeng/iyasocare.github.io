function loadProducts() {
	let currentPage = 1;
	let itemsPerPage = 6;
	let productsData = [];
	let productsDataLength;
	let totalPages;
	
	const zfProductsPagesNow = $('#zf-products-pages-now');
	const zfPageCurrent = zfProductsPagesNow.find('#zf-page-current');
	const zfPageTotal = zfProductsPagesNow.find('#zf-page-total');
	
	
	// 排序：null 默认，1 型号，2销量
	let order = null; // null -> all
	let search = null;
	let asc_df = true;
	let asc_1 = true;
	let asc_2 = true;
	
	const zfProTopBox = $('.zf-products-top-box');
	const proAll = zfProTopBox.find('.zf-products-top-all');
	const proOrderDf = zfProTopBox.find('.zf-products-top-orderby-default');
	const proOrder1 = zfProTopBox.find('.zf-products-top-orderby-model');
	
	const proOrderDf_i = proOrderDf.find('i');
	const proOrder1_i = proOrder1.find('i');
	
	const go = zfProTopBox.find('.zf-pro-bottom-go');
	const searchInput = zfProTopBox.find('#zf-products-search');
	const searchTip = zfProTopBox.find('.zf-products-top-bottom');
	// 搜索：'': all，'content': 过滤
	
	
	
	
	

	function init(o = null, s = null, p = null) {
		
		// 从URL获取初始页码
		const params = new URLSearchParams(window.location.search);
		currentPage = parseInt(params.get('p')) || currentPage;
		currentPage = (p > 0) ? p : currentPage;
		
		current_o = params.get('o') || order;
		current_s = params.get('s') || search;
		o = (o == null) ? current_o  : o;
		s = (s == null) ? current_s : s;
		
		// 从URL获取初始排序参数
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('p', 1);
		if (o !== null && o !== '') {newUrl.searchParams.set('o', o);} else {newUrl.searchParams.delete('o');}
		if (s !== null && s !== '') {newUrl.searchParams.set('s', s);} else {newUrl.searchParams.delete('s');}
		history.pushState({}, '', newUrl);
		
		// 加载JSON数据
		$.getJSON('json/products.json', function(data) {
			itemsPerPage = (data.itemsPerPage > itemsPerPage) ? data.itemsPerPage : itemsPerPage;  // 如果json设置的pageSize大于“let itemsPerPage = 6”则，等于json的设置
			productsData = data.data.filter(item => item.use == 1); // 只选择use == 1的
			
			productsData = (s == null) ? productsData : productsData.filter(item => item.title.toLowerCase().includes(s.toLowerCase()));
			
			if (o == null) {
				productsData.sort((a, b) => asc_df ? a.index - b.index : b.index - a.index);
			} else if (o == 1) {
				productsData.sort((a, b) => asc_1 ? a.model.localeCompare(b.model) : b.model.localeCompare(a.model));
			}
			proLoad();
			
			// let tip = s ? 'Search results:</span> ${s}' + s + 'tt' : '';
			let tip = s ? `Search results for <span>${s}</span>: <span>${productsDataLength}</span> products found.` : '';
			searchTip.html(tip);
			
		}).fail(function() {
			$('#zf-products-list').text('Sorry, there is an error with the API loading.');
		});
	}
	
	function proLoad() {
		productsDataLength = productsData.length;
		totalPages = Math.ceil(productsDataLength / itemsPerPage);
		$('#page-input').attr('max', totalPages);
		loadPageBegin(currentPage);
	}




	function loadPage(page) { 
		if (page <= 0) {
			page = 1;
		} else if (page > totalPages) {
			page = totalPages;
		} else if (currentPage !== page){
			loadPageBegin(page);
		}
		// 将当前页数的数值赋值给变量currentPage
		currentPage = page;
	}
	function loadPageBegin(page) {
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const paginatedData = productsData.slice(start, end);
		
		// 更新URL参数
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('p', page.toString());
		history.pushState({}, '', newUrl);
		
		// 渲染产品
		renderProducts(paginatedData);
		
		// 更新分页控件
		updatePaginationControls(page);
	}
	

	function renderProducts(products) {
		const $container = $('#zf-products-list');
		$container.empty();

		products.forEach(product => {
		  $container.append(`
			<a href="products/${product.model}.html" title="${product.title}">
				<div class="img-box">
					<img src="${product.img}" alt="${product.title}">
					<i class="flaticon-zfck-1- center-icon"></i>
				</div>
				<div class="details zf-pro-disc">
					<span>0</span>
					<div class="zf-pro-jianjie">
						<h3>${product.title}</h3>
						<p>${product.desc}</p>
					</div>
				</div>
			</a>
		  `);
		});
	}

	function updatePaginationControls(current) {
		zfPageCurrent.text(current);
		zfPageTotal.text(totalPages);
		$('#page-input').val(current);
		
		// 换成div
		if (current <= 1) {
			$('#prev-page').addClass('zf-page-arrow-disabled');
			$('#first-page').addClass('zf-page-arrow-disabled');
		} else {
			$('#prev-page').removeClass('zf-page-arrow-disabled');
			$('#first-page').removeClass('zf-page-arrow-disabled');
		}
		if (current >= totalPages) {
			$('#next-page').addClass('zf-page-arrow-disabled');
			$('#last-page').addClass('zf-page-arrow-disabled');
		} else {
			$('#next-page').removeClass('zf-page-arrow-disabled');
			$('#last-page').removeClass('zf-page-arrow-disabled');
		}
		
		
	}
	

	// 初始化加载
	init();
	// 加载所有产品
	proAll.click(() => {
		init('', '');
	})

	// 搜索
	// 代码 1
	go.click(() => {
		search = searchInput.val();
		init('', search, 1);
		
	});

	searchInput.keydown((e) => {
		if (e.key == 'Enter') {
			search = searchInput.val();
			init('', search, 1);
		}
	});
	
	// 代码 2 可替换代码1
	// go.add(searchInput).on('click keydown', function(e){
	// 	if (e.type == 'click' || (e.type == 'keydown' && e.key == 'Enter')) {
	// 		search = searchInput.val();
	// 		init(null, search);
	// 	}
	// })
	
	
// const proOrderDf_i = proOrderDf.find('i');
// const proOrder1_i = proOrder1.find('i');
	// 排序
	proOrderDf.click(function(){
		asc_df = !asc_df; asc_1 = true; asc_2 = true;currentPage = 1;
		$(this).addClass('zf-active').siblings().removeClass('zf-active');
		
		addClass = asc_df ? 'flaticon-zforder-asc' : 'flaticon-zforder-desc';
		removeClass = asc_df ? 'flaticon-zforder-desc' : 'flaticon-zforder-asc';
		proOrderDf_i.removeClass(removeClass).addClass(addClass);
		proOrder1_i.removeClass().addClass('flaticon-zforder-df');
		
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.delete('o');
		history.pushState({}, '', newUrl);
		
		productsData.sort((a, b) => asc_df ? a.index - b.index : b.index - a.index);
		proLoad();
		// loadPage(1);
	});
	
	proOrder1.click(function(){
		asc_1 = !asc_1; asc_df = true; asc_2 = true; currentPage = 1;
		$(this).addClass('zf-active').siblings().removeClass('zf-active');
		
		addClass = asc_df ? 'flaticon-zforder-asc' : 'flaticon-zforder-desc';
		removeClass = asc_df ? 'flaticon-zforder-desc' : 'flaticon-zforder-asc';
		proOrder1_i.removeClass(removeClass).addClass(addClass);
		proOrderDf_i.removeClass().addClass('flaticon-zforder-df');
		
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('o', 1);
		history.pushState({}, '', newUrl);
		
		productsData.sort((a, b) => asc_1 ? a.model.localeCompare(b.model) : b.model.localeCompare(a.model));
		proLoad();
	});

	// 事件绑定
	$('#first-page').click(() => loadPage(1));
	$('#prev-page').click(() => loadPage(currentPage - 1));
	$('#next-page').click(() => loadPage(currentPage + 1));
	$('#last-page').click(() => loadPage(Math.ceil(productsData.length / itemsPerPage)));
	$('#go-page').click(() => {
		const target = parseInt($('#page-input').val());
		if (target > 0 && target <= Math.ceil(productsData.length / itemsPerPage)) {
			loadPage(target);
		}
	});
	// 回车键事件
	$('#page-input').keydown((event) => {
	    if (event.key === 'Enter') {  // 检测是否按下回车键
	        const target = parseInt($('#page-input').val());
	        if (target > 0 && target <= Math.ceil(productsData.length / itemsPerPage)) {
	            loadPage(target);
	        }
	    }
	});
	$('#page-input').on('keydown', function(e) {
		// 阻止输入小数点（. 和 , 键）
		if (e.key === '.' || e.key === ',') {
			e.preventDefault();
		}
	}).on('input', function(){
		if ($(this).val() > totalPages) {
			$(this).val(totalPages);
		}
	});
	
}
loadProducts();


/*
const currentUrl = window.location.href;
const query = window.location.search.substring(1);
const queryArr = query.split('&');
const queryAbj = {};
for (const pair of queryArr) {
	const [key, value] = pair.split('=');
	queryAbj[decodeURIComponent(key)] = decodeURIComponent(value || '');
}
console.log(queryAbj);
*/

