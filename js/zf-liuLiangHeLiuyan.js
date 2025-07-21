$(function(){
	
	function zfLoadFooter() {
		const footerHtml = `
			<div class="footer-bottom">
				<div class="container">
					<p>© 2025 Chongqing Iyasocare Medical Co., Ltd. 重庆雅诗康医疗科技有限公司 版权所有 MADE BY ZHAOFENG</p>
				</div>
			</div>
		`;
		
		if (document.getElementById('zf-footer-js')) {
			fetch('footer.html')
				.then(response => response.text())
				.then(html => {
					document.getElementById('zf-footer-js').innerHTML = html;
					liuLiangHeLiuyan();
				})
				.catch(() => {
					document.getElementById('zf-footer-js').innerHTML = footerHtml;
					liuLiangHeLiuyan();
				});
		}
	}
	
	function checkIsNeedLoad() {
		let isNeedLoad = false;
		const footer = document.getElementById('zf-footer-js');
		if (footer) {
			isNeedLoad = footer.innerHTML.trim() =='';
		}
		isNeedLoad ? zfLoadFooter() : liuLiangHeLiuyan();
		return isNeedLoad;
	}
	checkIsNeedLoad();

	function liuLiangHeLiuyan() {
		let visitDomain = window.location.hostname;  
		let visitPage = window.location.pathname;  
		let visitPagePosition = 'footer';  
		let visitUrl = window.location.href; 
		
		let srcUrl = document.referrer; 
		let srcDomain = '';  
		let srcPlatform = navigator.platform; 
		
		let userLanguage = navigator.language || navigator.userLanguage; 
		let userLanguages = navigator.languages.join(', ');  
		
		let srcEngine = '';  
		let srcDevice = '';  
		let srcOs = ''; 
		
		let userAgentJs = navigator.userAgent;
		let userAgent = userAgentJs.toLowerCase();
		let srcBrowser = '';  
		
		let formIsValid = true;
		
		if (srcUrl) {
			const newSrcUrl = new URL(srcUrl);
			srcDomain = newSrcUrl.hostname;
			if (srcUrl.includes('google.com')) {
				srcEngine = 'Google';
			} else if (srcUrl.includes('baidu.com')) {
				srcEngine = 'Baidu';
			} else if (srcUrl.includes('bing.com')) {
				srcEngine = 'Bing';
			}
		}
		
		if (/mobile|android|iphone|ipad/i.test(userAgent)) {
			srcDevice = 'Mobile';
		} else {
			srcDevice = 'Desktop';
		}
		
		if (/win/i.test(userAgent)) {
			srcOs = 'Windows';
		} else if (/mac/i.test(userAgent)) {
			srcOs = 'MacOS';
		} else if (/linux/i.test(userAgent)) {
			srcOs = 'Linux';
		} else if (/android/i.test(userAgent)) {
			srcOs = 'Android';
		} else if (/iphone|ipad|ipod/i.test(userAgent)) {
			srcOs = 'iOS';
		}
		
		if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) {
			srcBrowser = 'Chrome';
		} else if (/firefox/i.test(userAgent)) {
			srcBrowser = 'Firefox';
		} else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
			srcBrowser = 'Safari';
		} else if (/edge/i.test(userAgent)) {
			srcBrowser = 'Edge';
		} else if (/opr\//i.test(userAgent)) {
			srcBrowser = 'Opera';
		} else if (/msie|trident/i.test(userAgent)) {
			srcBrowser = 'Internet Explorer';
		}
		
		const zfUserName = $('#zf-footer-name');
		const zfUserTel = $('#zf-footer-tel');
		const zfUserEmail = $('#zf-footer-email');
		const zfUserMessage = $('#zf-footer-message');
		
		const zfUserNameTip = $('.zf-footer-name-tip');
		const zfUserTelTip = $('.zf-footer-tel-tip');
		const zfUserEmailTip = $('.zf-footer-email-tip');
		const zfUserMessageTip = $('.zf-footer-message-tip');
		
		const zfSuccess = $('.zf-sub-success'); 
		const zfsuccessTip = $('.zf-sub-success-tip'); 
		const zfsuccessTipHtml = '<i class="flaticon-zfsuccess"></i><div>Thank you for your submission. We will respond to you at the earliest opportunity.</div>';
		
		const zfFooterCheckTip = $('.zf-footer-check-tip');
		
		
		const zfSubError = $('.zf-sub-error'); 
		const zfSubErrorTipClose = zfSubError.find('.zf-sub-error-tip-close'); 
		const zfSubErrorTip = zfSubError.find('.zf-sub-error-tip');
		const zfSubErrorTipTitle = zfSubError.find('.zf-sub-error-tip-title'); 
		
		const ZF_ERR_ARR = {
			FB: {
				'0': {
					t: "Oops! Your submission wasn’t completed",
					c: "Please ensure all required fields are filled correctly and try again."
				},
				'1': {
					t: "Sorry, the page didn’t load properly.",
					c: "Please refresh your browser or try submitting again later."
				},
				'2': {
					t: "We encountered a couple of issues.",
					c: ["Page didn't load. You'll need to refresh first before trying again.",
						"Incomplete submission. Check all required fields and resubmit."]
				}
			},
			EB: {
				'0': { 
					t: "Oops, there seems to be a server issue.",
					c: "Please try submitting again later."
				},
				'2': { 
					t: "Server Busy Alert",
					c: "We’ve noticed a high submission frequency. To ensure a smooth experience, please wait {zfEbSleepTime} minutes before trying again."
				},
				'3': {
					t: "Current Page Error",
					c: "The page has encountered an error or has expired. Please refresh and try again."
				},
				'4': {
					t: "Submission Incomplete or Invalid",
					c: "Oops! Some information seems to be missing. Kindly complete all fields and try submitting again."
				},
				'5': {
					t: "Server Error",
					c: "Oh no, it looks like there’s a server issue, Please refresh the page and try again later."
				},
				'400': {
					t: "Server network error",
					c: "Sorry, there’s an issue with the server or the network. Please try again later."
				}
			},
			
		}
		
		const ZF_ERR_TIP_TITLE = "ERROR:";
		const ZF_ERR_TIP_TEXT = "Something went wrong, possibly due to server or network issues. Please try again later or contact us.";
		const ZF_AJAX_URL = 'https://msg.iyasocare.cc:8008/user/ly';
		
		let zfLinkCheck = '';  
		
		const zfLiuLiangData = {
			'visitDomain': visitDomain,  
			'visitPage': visitPage, 
			'visitPagePosition': visitPagePosition, 
			'visitUrl': visitUrl, 
			
			'srcUrl': srcUrl, 
			'srcDomain' : srcDomain, 
			'srcPlatform': srcPlatform, 
			
			'userLanguage': userLanguage, 
			'userLanguages':  userLanguages,  
			
			'srcEngine': srcEngine, 
			'srcDevice': srcDevice,  
			'srcOs': srcOs, 
			
			'userAgentJs': userAgentJs,
			// 'userAgent': userAgent,
			'srcBrowser': srcBrowser, 
			
			'isLiuLiang': true, 
		};
		
		zfLiuLiangSubmit();
		function zfLiuLiangSubmit() {
			$.ajax({
				type: "POST", 
				url: ZF_AJAX_URL, 
				xhrFields: {
					withCredentials: true  
				},
				data: zfLiuLiangData,
				dataType: "json",
				success: function(s){zfLinkCheck = s.t;},
				error: function(e){}
			});
		}
		
		function userNameInput(){
			let userName = zfUserName.val().trim();
			const nameRegex = /^(?!\s*$)(?!.*\s{2,})[\s\S]{1,50}$/u;
			let tip = '';
			if (!userName) {
				tip = 'Name is required.';
				formIsValid = false;
			} else if (userName.length > 50) {
				tip = 'max 50 characters.';
				formIsValid = false;
			} else if (!nameRegex.test(userName)) {
				tip = 'No consecutive spaces.';
				formIsValid = false;
			}
			zfUserNameTip.text(tip);
		};
		
		function userTelInput(){
			let userTel = zfUserTel.val().trim();
			const telRegex = /^[0-9+\-\s]{0,20}$/;
			let tip = '';
			if (userTel && !telRegex.test(userTel)) {
				tip = 'Invalid phone number.';
				formIsValid = false;
			}
			zfUserTelTip.text(tip);
		};
		
		function userEmailInput(){
			let userEmail = zfUserEmail.val().trim();
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
			let tip = '';
			if (!userEmail) {
				tip = 'Email is required.';
				formIsValid = false;
			} else if (userEmail.length > 50) {
				tip = 'Email: max 50 characters.';
				formIsValid = false;
			} else if (!emailRegex.test(userEmail)) {
				tip = 'Invalid email.';
				formIsValid = false;
			}
			zfUserEmailTip.text(tip)
		};
		
		
		function userMessageInput() {
			let userMessage = zfUserMessage.val().trim();
			let tip = '';
			if (userMessage.length > 1000) {
				tip = 'max 1000 characters.';
				formIsValid = false;
			}
			zfUserMessageTip.text(tip);
		}
		
		zfUserName.on('input',function(){
			userNameInput();
		});
		zfUserTel.on('input',function(){
			userTelInput();
		});
		zfUserEmail.on('blur',function(){
			userEmailInput();
		});
		zfUserMessage.on('blur',function(){
			userMessageInput();
		});
			
			
		function subSuccess() {
			zfSuccess.removeClass('zf-ajax-loader');
			zfsuccessTip.html(zfsuccessTipHtml);
			zfUserName.val('');
			zfUserTel.val('');
			zfUserEmail.val('');
			zfUserMessage.val('');
		};
		

		function zfLiuyan() {  
			zfSuccess.removeClass('zf-none');
			let zfUserData = { 
				'userName': zfUserName.val().trim(),
				'userTel': zfUserTel.val().trim(),
				'userEmail': zfUserEmail.val().trim(),
				'userMessage': zfUserMessage.val().trim(),
				'zfLinkCheck': zfLinkCheck,
			};
			let zfLiuyanData = {
				...zfUserData,
				...zfLiuLiangData
			}
			delete zfLiuyanData.isLiuLiang;
			delete zfLiuyanData.srcDomain;
			
			let ef = 'EB';
			$.ajax({
				type: "POST",
				url: ZF_AJAX_URL,
				xhrFields: {
					withCredentials: true
				},
				data: zfLiuyanData,
				dataType: "json",
				success: function(s){ 
					let code = s.lyr;
					if (code == 1) {  
						subSuccess();
					} else {
						let time = s.lyt;
						zfSubErrorOpen(ef, code, time);
					}
				},
				error: function(e){
					zfSubErrorOpen(ef, 400);
				}
			});
			
		};
		
		function zfSubmit() {
			let ef = 'FB';
			formIsValid = true;
			userNameInput();
			userTelInput();
			userEmailInput();
			userMessageInput();
			if (zfLinkCheck.trim() && formIsValid) {
				zfLiuyan();
			} else if (!zfLinkCheck.trim() && !formIsValid) {  
				zfSubErrorOpen(ef, 2);
			} else { 
				if (!formIsValid) {
					zfSubErrorOpen(ef, 0);
				} else {  
					zfSubErrorOpen(ef, 1);
				}
			}
		};
		
		$('#zf-footer-button').on('click', function(event){ 
			event.preventDefault();
			zfSubmit();
		});
		
		function zfSubErrorOpen(ef, code, time = 0) {
			zfSubError.removeClass('zf-none');
			zfSuccess.addClass('zf-none');
			let t = (ZF_ERR_ARR?.[ef]?.[code]?.t ?? ZF_ERR_TIP_TITLE) + '(Err code:' + ((ef == 'FB') ? '0' : '1') + '-' + code + ')';
			let c = ZF_ERR_ARR?.[ef]?.[code]?.c ?? ZF_ERR_TIP_TEXT;
			if (Array.isArray(c)) {c = c.join('\n');}
			if (Number(time) > 0) {
				c = c.replace(/\{zfEbSleepTime\}/g, time);  
			}
			zfSubErrorTipTitle.text(t);
			zfSubErrorTip.text(c);
		}
		
		zfSubErrorTipClose.click(function(){
			zfSubError.addClass('zf-none');
			zfSubErrorTipTitle.text('');
			zfSubErrorTip.text('');
		});
		
//*****************************MSG*****************************//

		if (document.querySelector('.zf-leave-message')) {
			zfLeaveMsg(zfLiuLiangData);
		}
		function zfLeaveMsg(zfData) {
			
			const fromBox = $('.zf-leave-message');
			zfData.visitPagePosition = fromBox.data('zf-position');
			
			const lyzfUserName = fromBox.find('#zf-input-name');
			const lyzfUserTel = fromBox.find('#zf-input-tel');
			const lyzfUserEmail = fromBox.find('#zf-input-email');
			const lyzfUserMessage = fromBox.find('#zf-input-message');
			const lyzfSubMessage = fromBox.find('#zf-input-sub-msg');
			
			const lyzfUserNameTip = fromBox.find('.zf-input-name-tip');
			const lyzfUserTelTip = fromBox.find('.zf-input-tel-tip');
			const lyzfUserEmailTip = fromBox.find('.zf-input-email-tip');
			const lyzfUserMessageTip = fromBox.find('.zf-input-message-tip');
			
			const lyzfSuccess = fromBox.find('.zf-msg-success'); 
			const lyzfSuccessTip = fromBox.find('.zf-msg-success-tip'); 
			const lyzfSuccessTipHtml = '<i class="flaticon-zfsuccess"></i><div>Thank you for your submission. We will respond to you at the earliest opportunity.</div>';
			
			const zfSubError = $('.zf-sub-error'); 
			const zfSubErrorTipClose = zfSubError.find('.zf-sub-error-tip-close');  
			const zfSubErrorTip = zfSubError.find('.zf-sub-error-tip');  
			const zfSubErrorTipTitle = zfSubError.find('.zf-sub-error-tip-title'); 
			
			let zflyformIsValid = false;

			function zfuserNameInput(){
				let userName = lyzfUserName.val().trim();
				const nameRegex = /^(?!\s*$)(?!.*\s{2,})[\s\S]{1,50}$/u;
				let tip = '';
				if (!userName) {
					tip = 'Name is required.';
					zflyformIsValid = false;
				} else if (userName.length > 50) {
					tip = 'max 50 characters.';
					zflyformIsValid = false;
				} else if (!nameRegex.test(userName)) {
					tip = 'No consecutive spaces.';
					zflyformIsValid = false;
				}
				lyzfUserNameTip.text(tip);
			};
			
			function zfuserTelInput(){
				let userTel = lyzfUserTel.val().trim();
				const telRegex = /^[0-9+\-\s]{0,20}$/;
				let tip = '';
				if (userTel && !telRegex.test(userTel)) {
					tip = 'Invalid phone number.';
					zflyformIsValid = false;
				}
				lyzfUserTelTip.text(tip);
			};
			
			function zfuserEmailInput(){
				let userEmail = lyzfUserEmail.val().trim();
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
				let tip = '';
				if (!userEmail) {
					tip = 'Email is required.';
					zflyformIsValid = false;
				} else if (userEmail.length > 50) {
					tip = 'Email: max 50 characters.';
					zflyformIsValid = false;
				} else if (!emailRegex.test(userEmail)) {
					tip = 'Invalid email.';
					zflyformIsValid = false;
				}
				lyzfUserEmailTip.text(tip)
			};
			
			
			function zfuserMessageInput() {
				let userMessage = lyzfUserMessage.val().trim();
				let tip = '';
				if (userMessage.length > 1000) {
					tip = 'max 1000 characters.';
					zflyformIsValid = false;
				}
				lyzfUserMessageTip.text(tip);
			}

			lyzfUserName.on('input',function(){
				zfuserNameInput();
			});
			lyzfUserTel.on('input',function(){
				zfuserTelInput();
			});
			lyzfUserEmail.on('blur',function(){
				zfuserEmailInput();
			});
			lyzfUserMessage.on('blur',function(){
				zfuserMessageInput();
			});
			
			function zfsubSuccess() {
				lyzfSuccess.removeClass('zf-ajax-loader');
				
				lyzfSuccessTip.html(lyzfSuccessTipHtml);
				lyzfUserName.val('');
				lyzfUserTel.val('');
				lyzfUserEmail.val('');
				lyzfUserMessage.val('');
			};
			
			
			function zfLiuyanSub() {  
				lyzfSuccess.removeClass('zf-none');
				let zfUserData = {  
					'userName': lyzfUserName.val().trim(),
					'userTel': lyzfUserTel.val().trim(),
					'userEmail': lyzfUserEmail.val().trim(),
					'userMessage': lyzfUserMessage.val().trim(),
					'zfLinkCheck': zfLinkCheck,
				};
				let zfLiuyanData = {
					...zfUserData,
					...zfData,
				}
				delete zfLiuyanData.isLiuLiang;
				delete zfLiuyanData.srcDomain;
				
				let ef = 'EB';
				$.ajax({ 
					type: "POST",  
					url: ZF_AJAX_URL, 
					xhrFields: {
						withCredentials: true  
					},
					data: zfLiuyanData,
					dataType: "json",
					success: function(s){ 
						let code = s.lyr;
						if (code == 1) { 
							zfsubSuccess();
						} else {
							let time = s.lyt;
							zflySubErrorOpen(ef, code, time);
						}
					},
					error: function(e){ 
						zflySubErrorOpen(ef, 400);
					}
				});
			};
			
			function zfSubmitGo() {
				let ef = 'FB';  
				zflyformIsValid = true;
				zfuserNameInput();
				zfuserTelInput();
				zfuserEmailInput();
				zfuserMessageInput();
				if (zfLinkCheck.trim() && zflyformIsValid) {
					zfLiuyanSub();
				} else if (!zfLinkCheck.trim() && !zflyformIsValid) {  
					zflySubErrorOpen(ef, 2);
				} else { 
					if (!zflyformIsValid) { 
						zflySubErrorOpen(ef, 0);
					} else { 
						zflySubErrorOpen(ef, 1);
					}
				}
			};
			
			lyzfSubMessage.on('click', function(event){ 
				event.preventDefault();
				zfSubmitGo();
			});
			
			function zflySubErrorOpen(ef, code, time = 0) {
				zfSubError.removeClass('zf-none');
				lyzfSuccess.addClass('zf-none');
				let t = (ZF_ERR_ARR?.[ef]?.[code]?.t ?? ZF_ERR_TIP_TITLE) + ' (Err code:' + ((ef == 'FB') ? '0' : '1') + '-' + code + ')';
				let c = ZF_ERR_ARR?.[ef]?.[code]?.c ?? ZF_ERR_TIP_TEXT;
				if (Array.isArray(c)) {c = c.join('\n');}
				if (Number(time) > 0) {c = c.replace(/\{zfEbSleepTime\}/g, time);}
				zfSubErrorTipTitle.text(t);
				zfSubErrorTip.text(c);
			}
		}
	}
})
