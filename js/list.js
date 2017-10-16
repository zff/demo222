/**
 * Created by effy on 2017/10/13.
 */
$(function() {
    // Waves初始化
    Waves.displayEffect();
    // 数据表格动态高度
    $(window).resize(function () {
        $('#table').bootstrapTable('resetView', {
            height: getHeight()
        });
    });
    // 设置input特效
    $(document).on('focus', 'input[type="text"]', function() {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function() {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });
    // select2初始化
    $('select').select2();
});
// 动态高度
function getHeight() {
    return $(window).height() - 20;
}
// 数据表格展开内容
function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}
// 初始化input特效
function initMaterialInput() {
    $('form input[type="text"]').each(function () {
        if ($(this).val() != '') {
            $(this).parent().find('label').addClass('active');
        }
    });
}

var $table = $('#table');
$(function() {
    // bootstrap table初始化
    $table.bootstrapTable({
        url: "data/list.json",
        height: getHeight(),

        columns: [
            {field: 'ck', checkbox: true},
            {field: 'id', title: '编号',hidden:true, sortable: true, align: 'center'},
            {field: 'creatorName', title: '创建人'},
            {field: 'sendTime', title: '出发时间', sortable: true, align: 'center', formatter: 'typeFormatter'},
            {field: 'destination', title: '目的地'},
            {field: 'createTime', title: '创建时间', formatter: 'timeFormatter'},
            {field: 'status', title: '状态', sortable: true, align: 'center', formatter: 'statusFormatter'},
            {field: 'action', title: '操作', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
        ]
    });
});

// 格式化类型
function typeFormatter(value, row, index) {
    if (value == "subscribe") {
        return '<span class="label label-success">订阅号</span>';
    }
    if (value == "service") {
        return '<span class="label label-primary">服务号</span>';
    }
    if (value == "enterprise") {
        return '<span class="label label-danger">企业号</span>';
    }
}
// 格式化状态
// enabled/disabled
function statusFormatter(value, row, index) {
    if (value == "disabled") {
        return '<span class="label label-danger">停用</span>';
    }
    if (value == "enabled") {
        return '<span class="label label-primary">启用</span>';
    }
}

// 格式化操作按钮
//在此处编辑中可以直接进行状态的修改，为启用或者停用
function actionFormatter(value, row, index) {
    console.log("@@@@@@@@@",value,row,index);
    return [
        '<a class="delete" href="javascript:;" onclick="accessAppAction()" data-toggle="tooltip" title="Access"><i class="glyphicon glyphicon-star"></i></a>　',
        '<a class="update" href="javascript:;" onclick="updateAction()" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i></a>　',
        '<a class="delete" href="javascript:;" onclick="deleteAction()" data-toggle="tooltip" title="Remove"><i class="glyphicon glyphicon-remove"></i></a>'
    ].join('');
}

// 格式化时间
function timeFormatter(value , row, index) {
    return new Date(value).toLocaleString();
}

//进入APP
//此处的进入分为订阅号|服务号--可以进进入最后一层，将此处微信获得的微信openID等信息放入session中
//企业号还有一层，需要选择进入的应用，将应用信息放入session，便于与微信交互
function  accessAppAction() {
    alert("确定要进入该账户吗？");
}

// 删除
var deleteDialog;
function deleteAction() {
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length == 0) {
        $.confirm({
            title: false,
            content: '请至少选择一条记录！',
            autoClose: 'cancel|3000',
            backgroundDismiss: true,
            buttons: {
                cancel: {
                    text: '取消',
                    btnClass: 'waves-effect waves-button'
                }
            }
        });
    } else {
        deleteDialog = $.confirm({
            type: 'red',
            animationSpeed: 300,
            title: false,
            content: '确认删除该账户吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    btnClass: 'waves-effect waves-button',
                    action: function () {
                        var ids = new Array();
                        for (var i in rows) {
                            ids.push(rows[i].id);
                        }
                        $.ajax({
                            type: 'get',
                            url: '${basePath}/manage/wechat/account/platform/delete/' + ids.join("-"),
                            success: function(result) {
                                if (result.code != 1) {
                                    if (result.data instanceof Array) {
                                        $.each(result.data, function(index, value) {
//											$.confirm({
//												theme: 'dark',
//												animation: 'rotateX',
//												closeAnimation: 'rotateX',
//												title: false,
//												content: value.errorMsg,
//												buttons: {
//													confirm: {
//														text: '确认',
//														btnClass: 'waves-effect waves-button waves-light'
//													}
//												}
//											});
                                            $table.bootstrapTable('refresh');
                                        });
                                    } else {
//										$.confirm({
//											theme: 'dark',
//											animation: 'rotateX',
//											closeAnimation: 'rotateX',
//											title: false,
//											content: result.data.errorMsg,
//											buttons: {
//												confirm: {
//													text: '确认',
//													btnClass: 'waves-effect waves-button waves-light'
//												}
//											}
//										});
                                        $table.bootstrapTable('refresh');
                                    }
                                } else {
                                    deleteDialog.close();
                                    $table.bootstrapTable('refresh');
                                }
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                $.confirm({
                                    theme: 'dark',
                                    animation: 'rotateX',
                                    closeAnimation: 'rotateX',
                                    title: false,
                                    content: textStatus,
                                    buttons: {
                                        confirm: {
                                            text: '确认',
                                            btnClass: 'waves-effect waves-button waves-light'
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
                cancel: {
                    text: '取消',
                    btnClass: 'waves-effect waves-button'
                }
            }
        });
    }
}


// 新增
var createDialog;
function createAction() {
    createDialog = $.dialog({
        animationSpeed: 300,
        title: '新增账户',
        columnClass: 'xlarge',
        content: 'url:${basePath}/manage/wechat/account/platform/create',
        onContentReady: function () {
            initMaterialInput();
            $('select').select2();
        }
    });
}
// 编辑
var updateDialog;
function updateAction() {
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length != 1) {
        $.confirm({
            title: false,
            content: '请选择一条记录！',
            autoClose: 'cancel|3000',
            backgroundDismiss: true,
            buttons: {
                cancel: {
                    text: '取消',
                    btnClass: 'waves-effect waves-button'
                }
            }
        });
    } else {
        updateDialog = $.dialog({
            animationSpeed: 300,
            title: '编辑账户',
            columnClass: 'xlarge',
            content: 'url:${basePath}/manage/wechat/account/platform/update/' + rows[0].id,
            onContentReady: function () {
                initMaterialInput();
                $('select').select2();
            }
        });
    }
}