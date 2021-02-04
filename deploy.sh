echo 准备开始部署 admin !
echo 开始打包
npm run build:prod
echo 打包完成
echo 开始部署
echo 开始连接服务器。。。
ssh aili -t << EOF
echo 连接成功
cd /home/fontend/
ls
echo 删除文件
rm -rf ./admin
exit
EOF
echo 删除成功
echo 开始上传文件
scp -r /Users/kuubee/Desktop/self_porject/fontend/blog-admin/dist/admin aili:/home/fontend
echo 部署完成