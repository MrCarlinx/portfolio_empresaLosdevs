Portfolio empresa Los Devs
////
/////
////
Carlos
/////
Devid
/////
Debora
/////
Ruan
/////



<section id="mu-contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="mu-contact-area">
            <div class="mu-title">
            
              <h2>CONTATE-NOS</h2>
              <i class="fa fa-spoon"></i>              
              <span class="mu-title-bar"></span>
            </div>
            <div class="mu-contact-content">
              <div class="row">
                <div class="col-md-6">
                  <div class="mu-contact-left">
                    <form class="mu-contact-form" action="enviar.php" method="post">
                      <div class="form-group">
                        <label for="name">Seu Nome</label>
                        <input type="text" class="form-control" name="nome_contato" id="name" placeholder="Name" required>
                      </div>
                      <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email_contato" id="email" placeholder="Email" required>
                      </div>                      
                    
                      <div class="form-group">
                        <label for="message">Messagem</label>                        
                        <textarea class="form-control" id="message" cols="30" rows="10" name="mensagem_contato" placeholder="Sua Mensagem" required></textarea>
                      </div>                      
                      <button type="submit" class="mu-send-btn">Enviar</button>
                    </form>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mu-contact-right">
                    <div class="mu-contact-widget">
                      <h3>Endereço</h3>
                      <p>Entre em contato conosco, retornaremos via e-mail, mande-nos qualquer dúvida que tenha ou sugestão.</p>
                      <address>
                        <p><i class="fa fa-phone"></i> Fixo <?php echo $telefone_fixo ?> </p>
                        <a href="http://api.whatsapp.com/send?1=pt_BR&phone=<?php echo $telefone_whatsapp_link ?>" title="Ir para o Whatsapp" class="text-dark">
                        <p><i class="fa fa-whatsapp"></i> Whatsapp <?php echo $telefone_whatsapp ?> </p></a>
                        <p><i class="fa fa-envelope-o"></i><?php echo $email_adm ?></p>
                        <p><i class="fa fa-map-marker"></i><?php echo $endereco_site ?></p>
                      </address>
                    </div>
                    <div class="mu-contact-widget">
                      <h3>Horário de Funcionamento</h3>                      
                      <address>
                        <p><span>Segunda - Sexta</span> 18:00 às 00:00</p>
                       <p><span>Sábado</span> 15:00 às 01:00</p>
                        <p><span>Domingo</span> 11:00 às 00:00</p>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
