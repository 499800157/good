	var win={
		w:$(window).width(),
		h:$(window).height()
	}
	var $container=$('.container');
	$container.width(win.w);
	
	/*表单验证*/
	$(function(){
		var reg_user=/^[A-Z]\D{5,14}$/;  
		var reg_pass=/^\d{5,10}$/;
		var $user=$(':text') ;
		var $pass=$(':password') ;
		var $sub=$(':submit')
		function checkUser() {
			if(reg_user.test($user.val())){ 
				$user.css('border','1px solid green');
				return true;
			}else{
				$user.css('border','1px solid red');
				$user.text('')
				$user.attr('placeholder','请输入用户名')
				return false;
			}
		};
		$user.blur(checkUser);
		function checkPass(){
			if(reg_pass.test($pass.val())) {
				$pass.css('border','1px solid green');
				return true;
		}else{
			$pass.css('border','1px solid red');
			$pass.attr('placeholder','请输入密码')
			return false;
		};
		}
		$pass.blur(checkPass);
		function checkAll(){
			if(checkUser()&&checkPass()){
				location.href='index.html';
				return true;
			}else{
				alert('请输入正确格式验证码')
				$user.val('');
				$pass.val('');
				return false;
			}
		}
		$sub.mouseover(function(){
			$(this).css({'font-weight':'bolder','font-size':'23px','background':'#2ED346'})
		}).mouseout(function(){
			$(this).css({'font-weight':'','font-size':'','background':''})
		})
		$sub.click(function(ev){
			var e=ev||window.event;
			e.preventDefault();
			checkAll();
			$.cookie('username', $user.val(), {
				expires:3, path:'/'
				});
			})
		/*登录框效果*/	
		var $tank=$('.top>p');
		var $form=$('form');
		
		$form.css({'top':-$form.outerHeight()-60,'left':(win.w-$form.outerWidth())/2})
		var d=1;
		var $shan=$('.middle>div');
		var $shan_star=$('.middle>div li');
		var $shan_h2=$('.middle>div>h2')
		var $top=$shan_h2.offset().top;
		var $left=$shan_h2.offset().left;
		function star(){
			$shan_star.each(function(i,e){
				$(this).css({'top':Math.random()*480,'left':Math.random()*1300});
				/*if(parseInt($(this).css('top'))>parseInt(260+'px') && $(this).css('top')<340+'px'&&$(this).css('left')>404+'px'&& $(this).css('left')<943+'px'){
					$(this).remove();
				}*/
				//console.log($(this).eq(0).css('top'))
			}).fadeOut().fadeIn().fadeOut().fadeIn();
		}
		$tank.click(function(){
			if(d==1){
				$form.animate({'top':0},500,'bounceOut');
				$shan_star.parent().css('display','none');
				$shan.children('h2').css('display','none')
				d=0;
				return d;
			}
			if(d==0){
				$form.animate({'top':-$form.outerHeight()-60},600);
				$shan_star.parent().css('display','block');
				star();
				var timer=setInterval(star,1000);
				d=1;
				return d;
			}
		})
		star()
		//console.log(win.w-$form.outerWidth())
		
		
	})
