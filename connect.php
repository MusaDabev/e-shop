<?php
    $con = mysqli_connect('localhost', 'root', '',’e-mailfromsubscribe’);

    $txtEmail = $_POST['email'];

    $sql = "INSERT INTO `e-mail` ( `e-mail`) VALUES ( '$txtEmail');"

    $rs = mysqli_query($con, $sql);

    if($rs)
{
	echo "Contact Records Inserted";
}

?>