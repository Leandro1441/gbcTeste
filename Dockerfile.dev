FROM centos:centos7

WORKDIR /usr/share/GBC

RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

RUN yum localinstall -y https://www.linuxglobal.com/static/blog/pdftk-2.02-1.el7.x86_64.rpm

RUN yum update -y

RUN npm i -g pm2
RUN npm install -g node-gyp

COPY ./package*.json ./
RUN npm i

COPY ./ ./

CMD ["npm", "run", "start"]