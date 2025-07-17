function zfInsertFooter() {
	const footerHtml = `
		<div class="footer-bottom">
			<div class="container">
				<p>© 2025 Chongqing Iyasocare Medical Co., Ltd. 重庆雅诗康医疗科技有限公司 版权所有 MADE BY ZHAOFENG</p>
			</div>
		</div>
	`;
	
	
	if (document.getElementById('zf-pro-footer-js')) {
		if (document.getElementById('zf-pro-footer-js').innerHTML.trim() == '') {
			fetch('../footer.html')
				.then(response => response.text())
				.then(html => {
					document.getElementById('zf-pro-footer-js').innerHTML = html;
				})
				// .catch(() => {});
				.catch(
					// err => console.error('导航加载失败:', err);
					document.getElementById('zf-pro-footer-js').innerHTML = footerHtml;
				);
		}
	} else if (document.getElementById('zf-footer-js')) {
		if (document.getElementById('zf-footer-js').innerHTML.trim() == '') {
			fetch('footer.html')
				.then(response => response.text())
				.then(html => {
					document.getElementById('zf-footer-js').innerHTML = html;
				})
				// .catch(() => {});
				.catch(
					// err => console.error('导航加载失败:', err);
					document.getElementById('zf-footer-js').innerHTML = footerHtml;
				);
		}
	}
	
}

zfInsertFooter();



