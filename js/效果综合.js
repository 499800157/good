jQuery.extend({
	'lbt':function(ele,time,aniStyle){
	var $div = $(ele+'>.lbt'), $img = $div.children(), $ul = $div.next('.bar');
		var w = $img.width();
		
		$div.width(w * $img.size());
		
		$img.each(function(){			 //li的个数与图片个数相同；将图片遍历创建元素，个数就会同步
			$('<li></li>').appendTo($ul);
		});
		
		$ul.css('left',(w-$ul.outerWidth())/2+'px');
		
		var $li=$ul.children('li');
		
		var iNow=0;
		function change(){
			$li.eq(iNow).addClass('slt').siblings('li').removeClass('slt');
			$div.stop().animate({'margin-left':-w*iNow},500,aniStyle)
			$(ele+'>p').text($img.eq(iNow).children().attr('title'))
		}
		
		$li.click(function(){
			iNow=$(this).index();
			change();
		})
		
		$('.b').click(function(){
			iNow--;
			if(iNow==-1){
				iNow=0;
			}
			change();
		});
		$('.f').click(function(){
			iNow++;
			if(iNow==$li.size()){
				iNow=$li.size()-1;
			};
			change();
		})
		
		var d=1;
		function move(){
			if(iNow==0)d=1;
			if(iNow==$li.size()-1)d=-1;
			iNow+=d;
			change();
		}
		var timer=setInterval(move,time);
		$(ele).hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(move,time)
		})
		$li.eq(0).click()
	},
	/*主体2*******选项卡嵌套*/
	'tab':function(ele,time,aniStyle){
		var $nav_li=$(ele+'>.main02_nav>ul>li');
		var $tab=$('.main02_tab');
		$nav_li.click(function(){
			var index=$(this).index();
			$nav_li.each(function(i,e){
				$(e).css({'background':'black','opacity':'0.8'});
				$(e).children('p').css('display','none');
			})
			//$(this).children('p').animate({'border-top':'60px solid rgba(255,0,0,.4)','border-left':'70px solid transparent'})
			$(this).css({'background':'','opacity':'1'});
			$(this).children('p').css({'display':'block','background':'pink','opacity':'0.8'})
			$tab.each(function(i,e){
				$(e).css('display','none')
			});
			$tab.eq(index).css('display','block');
		});
		$nav_li.eq(0).click();	
		/*给选项卡菜单绑定单击*/
		var $box=$('#tab_1');
		var $li=$('#tab_1>ul:eq(0)>li');
		var $ul=$('#tab_1>ul:eq(1)');
		var $li1=$ul.children();
		$li.click(function(){
			var index=$(this).index();
			$li.each(function(i,e){
				$(e).css({'background':'','color':''});
			})
			$li.eq(index).css({'background':'#3E61AD','color':'white'});
			$li1.each(function(i,e){
				$(e).fadeOut().animate({'display':'none'})
			})
			$li1.eq(index).fadeIn().animate({'display':'block'});
		})
		$li.eq(0).click();
		/*手风琴*/
		var $sfq=$('#tab_3');
		var $sfq_li=$('#tab_3>li');
		/*$sfq_li.each(function(){
			$(this).animate('width',280)
		})
		$sfq_li.hover(function(){
			$(this).stop().animate({'width':580},600,'easeBoth').siblings().stop().animate({'width':30},600,'easeBoth')
		})
		*/
		
		$sfq_li.mouseover(function() {
			/*$(this).animate({'width': 580},200,'easeBoth').siblings('li').animate({'width': 30},200,'easeBoth');
			$(this).children('div').css('transform', 'rotate(0deg)')
				.parent().siblings('li').children('div').animate({'transform':'rotate(-90deg)'});
		});
		$sfq_li.eq(0).trigger('click');
		*/
		$(this).stop(true).animate({
					width:580
				},200);
				$(this).siblings().stop(true).animate({
					width:30
				},200)
				$(this).children('div').css({'transform':'rotate(0deg)'}).parent().siblings().children('div').css({'transform':'rotate(-90deg)'})
				$(this).children('div').animate({
					'font-size':'1.2em'
				},200)
				$(this).siblings().children('div').animate({
					'font-size':16
				},200)
		}).parent().mouseout(function(){
			$sfq_li.each(function(i,e){
				$(e).animate({'width':140})
				$(e).children('div').css({'transform':'rotate(-90deg)'})
			})
		})
	},
	/*购物车飞入*/
	'cart':function(){
		var $shop=$('.shop');
		var $cart=$('.main01>div>ul').children(':last');
		var $b=$('.main01>div>ul').children(':last').children('b'),num=0;
		$shop.click(function(){
			var $img=$(this).siblings('a').children();
			var offset_goods=$img.offset();
			var offset_cart=$cart.offset();
			//var $shop_add=$('.shop_car');
			//var $qq=$shop_add.parent().children()
			//console.log($qq)
			var $add=$('.shop_car>i');
			$img.clone().appendTo('body').css({
				width:$img.width(),
				height:$img.height(),
				position:'absolute',
				top:offset_goods.top,
				left:offset_goods.left,
				'z-index':100
			}).animate({
				width:0,
				height:0,
				top:offset_cart.top+25,
				left:offset_cart.left+60
			},1000,function(){
				$(this).remove();
				
				$add.show().animate({
					top:-100,
					opacity:0.2
				},500,function(){
					$(this).hide().css({
						top:8,
						opacity:1
				})
			})
				
			})
			$b.text(++num);
		})
	},
	'xhqh':function(){
		var $xhqh=$('.main03');
		var $b=$xhqh.children('img').eq(0);
		var $f=$xhqh.children('img').eq(1);
		var $ul=$xhqh.children('ul');
		var $ul_ul=$xhqh.children('ul').children('li').children('ul');
		var w=$ul_ul.width();
		$b.click(function(){
			$ul.animate({
				'margin-left':-w
			},400)
			$ul.queue(function(){
				$(this).css({'margin-left':0}).children(':first').appendTo($(this));
				$(this).dequeue();
			})
		});
		$f.click(function(){
			$ul.stop().queue(function(){
				$(this).css('margin-left',-w).children(':last').prependTo($(this));
				$(this).dequeue();
			})
			$ul.stop().animate({
				'margin-left':0
			},400)
		});
		var $person=$('.person');
		var $img=$person.parent();
		$img.hover(function(){
			$(this).children('img').animate({'width':'103%','height':'103%'})
			$(this).children('div').css({'color':'yellow','border-color':'yellow'},200)
			
		},function(){
			$(this).children('img').animate({'width':'100%','height':'100%'},200);
			$(this).children('div').css({'color':'','border-color':''},200)
		})
	},
	'wfgn':function(){
		var $box=$('.lj_box'),$ul=$('.lj_box>ul');
		var $li=$('.lj_box li')
		var h=$li.height();
		var $p=$('.lj_box>p');
		var i=1;
		$box.hover(function(){
			$ul.stop(true,false);
		},function(){
			$ul.animate({
				'margin-top':-h
			},1500,function(){
				$(this).children(':first').appendTo($(this));
				$(this).css('margin-top',0)
				$(this).trigger('mouseout');
				i++;
				$p.children().eq(i%2).delay(1000).fadeIn().siblings().fadeOut();
			})
		});
		$box.trigger('mouseout');
	}
	
})
